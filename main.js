function calculateZakat() {
    let cash = parseFloat(document.getElementById("cash").value) || 0;
    let savings = parseFloat(document.getElementById("savings").value) || 0;
    let loaned = parseFloat(document.getElementById("loaned").value) || 0;
    let gold = parseFloat(document.getElementById("gold").value) || 0;
    let silver = parseFloat(document.getElementById("silver").value) || 0;
    let business = parseFloat(document.getElementById("business").value) || 0;
    let investments = parseFloat(document.getElementById("investments").value) || 0;
    let property = parseFloat(document.getElementById("property").value) || 0;
    let debts = parseFloat(document.getElementById("debts").value) || 0;

    let totalAssets = cash + savings + loaned + gold + silver + business + investments + property;
    let netWealth = totalAssets - debts;

    let nisab = 87.48 * 8800;  // Nisab = 87.48g of Gold × ₹8,800 per gram
    let zakat = (netWealth >= nisab) ? netWealth * 0.025 : 0;

    document.getElementById("result").innerHTML = 
        `Total Assets: ₹${totalAssets.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        Net Wealth (After Debts): ₹${netWealth.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        Nisab: ₹${nisab.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        Zakat Payable (2.5%): ₹${zakat.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

}

function resetForm() {
    document.getElementById("cash").value = "";
    document.getElementById("savings").value = "";
    document.getElementById("loaned").value = "";
    document.getElementById("gold").value = "";
    document.getElementById("silver").value = "";
    document.getElementById("business").value = "";
    document.getElementById("investments").value = "";
    document.getElementById("property").value = "";
    document.getElementById("debts").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("nisabAmount").innerText = (87.48 * 8800).toFixed(2);
}

// Initialize Nisab Amount
document.getElementById("nisabAmount").innerText = (87.48 * 8800).toFixed(2);