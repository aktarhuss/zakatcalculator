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

document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("input", function() {
        if (this.value < 0) this.value = 0; // Prevent negative numbers
    });
});

function getValue(id) {
    return parseFloat(document.getElementById(id).value.replace(/,/g, "")) || 0;
}

function calculateZakat() {
    let button = document.querySelector("button[onclick='calculateZakat()']");
    button.disabled = true; // Disable button while calculating

    let loadingElement = document.getElementById("loading");
    let resultElement = document.getElementById("result");
    let zakatElement = document.getElementById("your-zakat");

    // Get selected Nisab type from the toggle state
    let nisabType = selectedNisab;
    let nisab = (nisabType === "gold") ? 87.5 * 8900 : 612 * 99;

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
        let zakat = (netWealth >= nisab) ? (netWealth * 0.025).toFixed(2) : "0.00";

        resultElement.innerHTML = `
            <strong>Total Assets:</strong> ₹${totalAssets.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Total Liabilities:</strong> ₹${debts.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Net Wealth:</strong> ₹${netWealth.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Nisab (${nisabType.charAt(0).toUpperCase() + nisabType.slice(1)}):</strong> ₹${nisab.toLocaleString("en-IN", { minimumFractionDigits: 2 })}<br>
            <strong>Zakat Payable (2.5%):</strong> ₹${parseFloat(zakat).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;

        zakatElement.textContent = `₹${zakat.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

        setTimeout(() => {
            resultElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);

        loadingElement.style.display = "none"; // Hide loading
        button.disabled = false; // Enable button after calculation

    }, 1000);
}

function resetForm() {
    document.querySelectorAll("input[type='text']").forEach(input => {
        input.value = "0";
        formatIndianNumber(input); // Ensure correct comma formatting after reset
    });
    document.getElementById("result").innerHTML = "";
    document.getElementById("your-zakat").textContent = "₹0.00"; // Ensure 2 decimal places on reset
}

function updateNisab() {
    let nisabSwitch = document.getElementById("nisab-switch");
    let nisabType = nisabSwitch.checked ? "silver" : "gold";
    let nisab = (nisabType === "gold") ? 87.5 * 8900 : 612 * 99; // Gold or Silver Nisab
    document.getElementById("nisabAmount").textContent = nisab.toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

// Initialize the Nisab value when the page loads
document.addEventListener("DOMContentLoaded", updateNisab);

// Default selection is Silver
let selectedNisab = "silver";

// Function to update Nisab selection
function setNisab(type) {
    selectedNisab = type;
    
    // Update Nisab amount
    let nisab = (selectedNisab === "gold") ? 87.5 * 8900 : 612 * 99;
    document.getElementById("nisabAmount").textContent = nisab.toLocaleString("en-IN", { minimumFractionDigits: 2 });

    // Toggle active class
    document.getElementById("goldBtn").classList.toggle("active", type === "gold");
    document.getElementById("silverBtn").classList.toggle("active", type === "silver");
}

document.addEventListener("DOMContentLoaded", () => setNisab("silver"));

function formatIndianNumber(input) {
    // Save the cursor position
    let cursorPosition = input.selectionStart;

    // Get the raw value (remove commas)
    let value = input.value.replace(/,/g, "");

    // Allow only numbers
    if (!/^\d*$/.test(value)) {
        return;
    }

    // Format the number using the Indian numbering system
    let formattedValue = new Intl.NumberFormat("en-IN").format(value);

    // Set formatted value back to input
    input.value = formattedValue;

    // Restore cursor position to the end
    input.setSelectionRange(input.value.length, input.value.length);
}

function isNumberKey(evt) {
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
        evt.preventDefault(); // Prevent non-numeric characters
    }
}
