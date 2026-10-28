(function () {
  "use strict";

  const tbody = document.getElementById("lender-rows");
  const countEl = document.getElementById("result-count");
  const searchEl = document.getElementById("search");
  const typeEl = document.getElementById("loan-type");
  const sortEl = document.getElementById("sort");
  const resetBtn = document.getElementById("reset-filters");

  let lenders = [];

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loanTypeTags(types) {
    return (types || [])
      .map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + "</span>";
      })
      .join("");
  }

  function contactHtml(l) {
    var parts = [];
    if (l.phone && l.phone !== "Not published") {
      var tel = String(l.phone).replace(/[^\d+]/g, "");
      parts.push('<a href="tel:' + escapeHtml(tel) + '">' + escapeHtml(l.phone) + "</a>");
    }
    if (l.email && l.email !== "Not published") {
      parts.push('<a href="mailto:' + escapeHtml(l.email) + '">' + escapeHtml(l.email) + "</a>");
    }
    if (!parts.length) {
      parts.push('<span class="muted">See website</span>');
    }
    return parts.join("");
  }

  function matchesType(lender, filter) {
    if (!filter || filter === "all") return true;
    var blob = (lender.loan_types || []).join(" ").toLowerCase();
    var map = {
      flip: /fix|flip|rehab/,
      bridge: /bridge/,
      construction: /construction|new build|build/,
      rental: /rental|dscr|fix-to-rent|brrrr|fix and keep|long-term/,
      commercial: /commercial/,
      transactional: /transaction/
    };
    var re = map[filter];
    return re ? re.test(blob) : true;
  }

  function matchesSearch(lender, q) {
    if (!q) return true;
    var hay = [
      lender.name,
      lender.hq_city,
      lender.areas_served,
      (lender.loan_types || []).join(" "),
      lender.ltv_leverage,
      lender.terms,
      lender.notes
    ]
      .join(" ")
      .toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function sortLenders(list, mode) {
    var copy = list.slice();
    if (mode === "name-desc") {
      copy.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    } else if (mode === "local-first") {
      copy.sort(function (a, b) {
        var aLocal = /ga|atlanta|marietta|decatur|roswell|douglasville/i.test(a.hq_city || "") ? 0 : 1;
        var bLocal = /ga|atlanta|marietta|decatur|roswell|douglasville/i.test(b.hq_city || "") ? 0 : 1;
        if (aLocal !== bLocal) return aLocal - bLocal;
        return a.name.localeCompare(b.name);
      });
    } else {
      copy.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
    return copy;
  }

  function render() {
    var q = (searchEl.value || "").trim().toLowerCase();
    var type = typeEl.value;
    var filtered = lenders.filter(function (l) {
      return matchesSearch(l, q) && matchesType(l, type);
    });
    filtered = sortLenders(filtered, sortEl.value);

    countEl.textContent =
      filtered.length +
      " of " +
      lenders.length +
      " lenders shown · Verified " +
      (window.MOGUL_VERIFIED || "2026-10-27");

    if (!filtered.length) {
      tbody.innerHTML =
        '<tr><td colspan="8" class="empty">No lenders match these filters. Try clearing search or choosing All loan types.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered
      .map(function (l) {
        return (
          "<tr>" +
          '<td class="name-cell"><strong>' +
          escapeHtml(l.name) +
          '</strong><div class="hq">' +
          escapeHtml(l.hq_city || "") +
          "</div></td>" +
          "<td>" +
          escapeHtml(l.areas_served || "Not published") +
          "</td>" +
          '<td><div class="tags">' +
          loanTypeTags(l.loan_types) +
          "</div></td>" +
          "<td>" +
          escapeHtml(l.ltv_leverage || "Not published") +
          "</td>" +
          "<td>" +
          escapeHtml(l.terms || "Not published") +
          "</td>" +
          '<td class="contact">' +
          contactHtml(l) +
          "</td>" +
          "<td><a href=\"" +
          escapeHtml(l.website) +
          '" target="_blank" rel="noopener noreferrer">Website</a>' +
          (l.source_url
            ? '<br><a href="' +
              escapeHtml(l.source_url) +
              '" target="_blank" rel="noopener noreferrer">Source</a>'
            : "") +
          "</td>" +
          '<td class="verified">' +
          escapeHtml(l.verified || "") +
          "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  function populateTypes(list) {
    // static options already in HTML; nothing dynamic required
  }

  function boot(data) {
    lenders = data.lenders || [];
    window.MOGUL_VERIFIED = (data.meta && data.meta.verified_date) || "2026-10-27";
    populateTypes(lenders);
    render();
  }

  searchEl.addEventListener("input", render);
  typeEl.addEventListener("change", render);
  sortEl.addEventListener("change", render);
  resetBtn.addEventListener("click", function () {
    searchEl.value = "";
    typeEl.value = "all";
    sortEl.value = "local-first";
    render();
  });

  // Prefer embedded data (works offline / file://); fall back to fetch for http servers
  if (window.MOGUL_LENDERS) {
    boot(window.MOGUL_LENDERS);
  } else {
    fetch("lenders.json")
      .then(function (r) {
        if (!r.ok) throw new Error("Could not load lenders.json");
        return r.json();
      })
      .then(boot)
      .catch(function (err) {
        countEl.textContent = "Could not load lender data.";
        tbody.innerHTML =
          '<tr><td colspan="8" class="empty">' +
          escapeHtml(err.message) +
          " Open via a local server or ensure lenders.embedded.js is present.</td></tr>";
      });
  }
})();
