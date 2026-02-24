document.addEventListener("DOMContentLoaded", function () {

    const ZAKAT_RATE = 0.025;
    const GOLD_NISAB = 87.48 * 15430.00;
    const SILVER_NISAB = 612.36 * 273.9;

    let selectedNisab = null;

    const inputs = document.querySelectorAll("input[type='text']");
    const resultEl = document.getElementById("result");
    const zakatEl = document.getElementById("your-zakat");
    const errorEl = document.getElementById("error-message");
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const goldBtn = document.getElementById("goldBtn");
    const silverBtn = document.getElementById("silverBtn");

    const formatCurrency = (num) =>
        num.toLocaleString("en-IN", { minimumFractionDigits: 2 });

    const getValue = (id) =>
        parseFloat(document.getElementById(id).value.replace(/,/g, "")) || 0;

    inputs.forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (!/[0-9]/.test(e.key)) e.preventDefault();
        });

        input.addEventListener("input", () => {
            let value = input.value.replace(/,/g, "").replace(/\D/g, "");
            if (!value) {
                input.value = "";
                return;
            }
            input.value = new Intl.NumberFormat("en-IN").format(value);
        });
    });

    function setNisab(type) {
        selectedNisab = type;
        goldBtn.classList.remove("active");
        silverBtn.classList.remove("active");
        if (type === "gold") goldBtn.classList.add("active");
        if (type === "silver") silverBtn.classList.add("active");
        errorEl.textContent = "";
    }

    goldBtn.addEventListener("click", () => setNisab("gold"));
    silverBtn.addEventListener("click", () => setNisab("silver"));

    function calculateZakat() {

    errorEl.textContent = "";
    resultEl.innerHTML = "";
    zakatEl.textContent = "—";

    if (!selectedNisab) {
        errorEl.textContent = "Please select Nisab type (Gold or Silver).";
        return;
    }

    const fields = [
        "cash", "savings", "loaned", "gold",
        "silver", "business", "investments", "property"
    ];

    const totalAssets = fields.map(getValue)
                              .reduce((sum, val) => sum + val, 0);

    if (totalAssets === 0) {
        errorEl.textContent = "Please enter at least one asset value.";
        return;
    }

    // ✅ START LOADING
    calculateBtn.disabled = true;
    const originalText = calculateBtn.textContent;
    calculateBtn.textContent = "Calculating...";

    setTimeout(() => {

        const debts = getValue("debts");
        const netWealth = totalAssets - debts;

        const rawNisab = selectedNisab === "gold" ? GOLD_NISAB : SILVER_NISAB;
        const nisab = Math.round(rawNisab * 100) / 100;

        if (netWealth < nisab) {
            resultEl.innerHTML = `
                Net Wealth: ₹${formatCurrency(netWealth)}<br>
                Nisab (${selectedNisab}): ₹${formatCurrency(nisab)}<br>
                <span style="color:red;">You are below Nisab. Zakat is not obligatory.</span>
            `;
            zakatEl.textContent = "₹0.00";
        } else {
            const zakat = netWealth * 0.025;

            resultEl.innerHTML = `
                Total Assets: ₹${formatCurrency(totalAssets)}<br>
                Total Debts: ₹${formatCurrency(debts)}<br>
                Net Wealth: ₹${formatCurrency(netWealth)}<br>
                Nisab (${selectedNisab}): ₹${formatCurrency(nisab)}<br>
            `;

            zakatEl.textContent = `₹${formatCurrency(zakat)}`;
        }

        // ✅ STOP LOADING
        calculateBtn.disabled = false;
        calculateBtn.textContent = originalText;

    }, 1200); // 1.2 second fake delay
}

    function resetForm() {
        inputs.forEach(input => input.value = "");
        resultEl.innerHTML = "";
        zakatEl.textContent = "—";
        errorEl.textContent = "";
        selectedNisab = null;
        goldBtn.classList.remove("active");
        silverBtn.classList.remove("active");
    }

    calculateBtn.addEventListener("click", calculateZakat);
    resetBtn.addEventListener("click", resetForm);

});
