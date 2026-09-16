(function () {
  const rows = Array.from(document.querySelectorAll(".cookie-row"));
  const countEl = document.getElementById("cookie-count");
  const totalEl = document.getElementById("cookie-total");
  const form = document.getElementById("cookie-form");
  const success = document.getElementById("order-success");
  const preview = document.getElementById("order-preview");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function money(n) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function summarize() {
    let count = 0;
    let total = 0;
    const lines = [];
    rows.forEach((row) => {
      const price = parseFloat(row.dataset.price);
      const input = row.querySelector("input");
      const qty = Math.max(0, parseInt(input.value || "0", 10) || 0);
      input.value = qty;
      count += qty;
      total += qty * price;
      if (qty > 0) lines.push(`${qty} × ${row.dataset.name} (${money(price)})`);
    });
    countEl.textContent = String(count);
    totalEl.textContent = money(total);
    return { count, total, lines };
  }

  rows.forEach((row) => {
    const input = row.querySelector("input");
    row.querySelector(".minus").addEventListener("click", () => {
      input.value = Math.max(0, (parseInt(input.value, 10) || 0) - 1);
      summarize();
    });
    row.querySelector(".plus").addEventListener("click", () => {
      input.value = Math.min(48, (parseInt(input.value, 10) || 0) + 1);
      summarize();
    });
    input.addEventListener("input", summarize);
  });

  summarize();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const summary = summarize();
    if (summary.count === 0) {
      form.reportValidity();
      alert("Add at least one cookie to the box.");
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const body = [
      `Cookie order from ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Date: ${data.get("date")}`,
      `Fulfillment: ${data.get("fulfillment")}`,
      "",
      summary.lines.join("\n"),
      "",
      `Total cookies: ${summary.count}`,
      `Estimated total: ${money(summary.total)}`,
      "",
      `Notes: ${data.get("notes") || "—"}`,
    ].join("\n");

    preview.textContent = body;
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "center" });

    const mailto = `mailto:ana@mirabeaubakery.com?subject=${encodeURIComponent("Cookie order — Mirabeau")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
})();
