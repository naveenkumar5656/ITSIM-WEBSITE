function loginUser() {

    window.location.href = "dashboard1.html";

    return false;

}


/* ---------- Save Item ---------- */

function saveItem() {

    let item = {

        category: document.getElementById("category").value,

        itemname: document.getElementById("itemname").value,

        brand: document.getElementById("brand").value,

        model: document.getElementById("model").value,

        specification: document.getElementById("specification").value,

        serial: document.getElementById("serial").value,

        assetid: document.getElementById("assetid").value,

        college: document.getElementById("college").value,

        department: document.getElementById("department").value,

        location: document.getElementById("location") ?
        document.getElementById("location").value : "",

        quantity: document.getElementById("quantity") ?
        document.getElementById("quantity").value : "",

        vendor: document.getElementById("vendor") ?
        document.getElementById("vendor").value : "",

        invoice: document.getElementById("invoice") ?
        document.getElementById("invoice").value : "",

        invoiceDate: document.getElementById("invoiceDate") ?
        document.getElementById("invoiceDate").value : "",

        purchaseDate: document.getElementById("purchaseDate") ?
        document.getElementById("purchaseDate").value : "",

        warranty: document.getElementById("warranty") ?
        document.getElementById("warranty").value : "",

        cost: document.getElementById("cost") ?
        document.getElementById("cost").value : "",

        status: document.getElementById("status") ?
        document.getElementById("status").value : "",

        remarks: document.getElementById("remarks") ?
        document.getElementById("remarks").value : ""

    };


    let items = JSON.parse(localStorage.getItem("items")) || [];


    items.push(item);


    localStorage.setItem("items", JSON.stringify(items));


    alert("✅ Item Saved Successfully");


    document.getElementById("itemForm").reset();

}


/* ---------- Open View Items ---------- */

function openItems(){

    window.location.href="viewitems.html";

}


/* ---------- Clear Form ---------- */

function clearForm(){

    document.getElementById("itemForm").reset();

}


/* ---------- Logout ---------- */

function logout(){

    if(confirm("Are you sure you want to Logout?")){

        window.location.href="login.html";

    }

}

/* ---------- Dashboard Low Stock Count ---------- */

window.onload = function () {

    // Low Stock Count

    const lowStockRows = document.querySelectorAll("#lowStockTable tr");

    const totalLowStock = lowStockRows.length - 1;

    const countElement = document.getElementById("lowStockCount");

    if (countElement) {

        countElement.innerText = totalLowStock;

    }

    // Load Masters into Dropdowns

    loadDropdown("category", "category");

    loadDropdown("brand", "brand");

    loadDropdown("college", "college");

};

/* ---------- Block Future Date ---------- */

window.addEventListener("load", function () {

    const issueDate = document.getElementById("issueDate");

    if (issueDate) {

        const today = new Date().toISOString().split("T")[0];

        issueDate.setAttribute("max", today);

    }

});

/* ---------- Save Issue ---------- */

function saveIssue() {

    let issue = {

        college: document.querySelector("select").value,

        department: document.querySelectorAll("input")[0].value,

        issuedTo: document.querySelectorAll("input")[1].value,

        itemName: document.querySelectorAll("input")[2].value,

        quantity: document.querySelectorAll("input")[3].value,

        issueDate: document.getElementById("issueDate").value,

        remarks: document.querySelector("textarea").value

    };

    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));

    alert("✅ Issue Saved Successfully");

}

/* ---------- Category Master ---------- */

function saveCategory() {

    let category = document.getElementById("categoryName").value.trim();

    if (category == "") {
        alert("Please Enter Category Name");
        return;
    }

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

// Duplicate Check

let exists = categories.some(c => c.toLowerCase() === category.toLowerCase());

if (exists) {
    alert("❌ Category Already Exists");
    return;
}

    categories.push(category);

    localStorage.setItem("categories", JSON.stringify(categories));

    document.getElementById("categoryName").value = "";

    loadCategories();

}

function loadCategories() {

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    let table = document.getElementById("categoryTable");

    if (!table) return;

    table.innerHTML = "";

    categories.forEach(function(category, index) {

        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${category}</td>
        </tr>
        `;

    });

}

window.onload = function () {
    loadCategories();
};

/* ---------- Load Dropdown ---------- */

function loadDropdown(dropdownId, storageKey){

    let dropdown = document.getElementById(dropdownId);

    if(!dropdown) return;

    let data = JSON.parse(localStorage.getItem(storageKey)) || [];

    dropdown.innerHTML = "<option value=''>-- Select --</option>";

    data.forEach(item=>{

        dropdown.innerHTML += `<option>${item}</option>`;

    });

}