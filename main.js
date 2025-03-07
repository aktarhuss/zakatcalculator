function clearIfZero(input) {
    if (input.value === "0") {
        input.value = ""; // Clears the default zero when clicked
    }
}

function restoreIfEmpty(input) {
    if (input.value.trim() === "") {
        input.value = "0"; // Restores zero if left empty
    }
}

function getValue(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

function calculateZakat() {
    let button = document.querySelector("button[onclick='calculateZakat()']");
    button.disabled = true; // Disable button during calculation

    let loadingElement = document.getElementById("loading"); 
    let resultElement = document.getElementById("result");
    let zakatElement = document.getElementById("your-zakat");

    // Show loading animation
    loadingElement.style.display = "block";
    resultElement.innerHTML = "";
    zakatElement.textContent = "-----";

    setTimeout(() => {
        let cash = getValue("cash");
        let savings = getValue("savings");
        let loaned = getValue("loaned");
        let gold = getValue("gold");
        let silver = getValue("silver");
        let business = getValue("business");
        let investments = getValue("investments");
        let property = getValue("property");
        let debts = getValue("debts");

        let totalAssets = cash + savings + loaned + gold + silver + business + investments + property;
        let netWealth = totalAssets - debts;
        let nisab = 87.48 * 8800;  // Nisab Calculation
        let zakat = (netWealth >= nisab) ? netWealth * 0.025 : 0;

        resultElement.innerHTML = `
            <strong>Total Assets:</strong> ₹${totalAssets.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Total Liabilities:</strong> ₹${debts.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Net Wealth:</strong> ₹${netWealth.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Nisab:</strong> ₹${nisab.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Zakat Payable (2.5%):</strong> ₹${zakat.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        `;

        zakatElement.textContent = `₹${zakat.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

        setTimeout(() => {
            resultElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);

        // Hide loading animation
        loadingElement.style.display = "none";
        button.disabled = false; // Re-enable button after calculation

    }, 1000);
}

function resetForm() {
        document.getElementById("cash").value = "0";
        document.getElementById("savings").value = "0";
        document.getElementById("loaned").value = "0";
        document.getElementById("gold").value = "0";
        document.getElementById("silver").value = "0";
        document.getElementById("business").value = "0";
        document.getElementById("investments").value = "0";
        document.getElementById("property").value = "0";
        document.getElementById("debts").value = "0";
        document.getElementById("result").innerHTML = "";
        document.getElementById("your-zakat").textContent = "-----"; // Reset the separate zakat display
}

document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("input", function() {
        if (this.value < 0) this.value = 0;
    });
});
