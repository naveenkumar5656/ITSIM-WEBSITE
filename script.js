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

    loadCategoryDropdown();

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

/* ---------- Item Type Change ---------- */

function toggleItemType() {

    let itemType = document.getElementById("itemType").value;

    let serialGroup = document.getElementById("serialGroup");
    let assetGroup = document.getElementById("assetGroup");
    let quantity = document.getElementById("quantity");

    if(itemType === "consumable"){

        serialGroup.style.display = "none";
        assetGroup.style.display = "none";

        quantity.readOnly = false;
        quantity.value = 1;

    }
    else{

        serialGroup.style.display = "flex";
        assetGroup.style.display = "flex";

        quantity.value = 1;
        quantity.readOnly = true;

    }

}

function loadCategoryDropdown() {

    let categoryDropdown = document.getElementById("category");

    if (!categoryDropdown) return;

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    categoryDropdown.innerHTML = '<option value="">-- Select Category --</option>';

    categories.forEach(function(category) {

        categoryDropdown.innerHTML += `
            <option value="${category}">${category}</option>
        `;

    });

}

function saveBrand() {

    let brand = document.getElementById("brandName").value.trim();

    if (brand == "") {
        alert("Please Enter Brand Name");
        return;
    }

    let brands = JSON.parse(localStorage.getItem("brands")) || [];

    let exists = brands.some(b => b.toLowerCase() === brand.toLowerCase());

    if (exists) {
        alert("Brand Already Exists");
        return;
    }

    brands.push(brand);

    localStorage.setItem("brands", JSON.stringify(brands));

    document.getElementById("brandName").value = "";

    loadBrands();

}

function loadBrands() {

    let brands = JSON.parse(localStorage.getItem("brands")) || [];

    let table = document.getElementById("brandTable");

    if (!table) return;

    table.innerHTML = "";

    brands.forEach(function(brand, index) {

        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${brand}</td>
        </tr>
        `;

    });

}

// ================= BRAND MASTER =================

function saveBrand() {

    let brand = document.getElementById("brandName").value.trim();

    if (brand === "") {
        alert("Please Enter Brand Name");
        return;
    }

    let brands = JSON.parse(localStorage.getItem("brands")) || [];

    if (brands.includes(brand)) {
        alert("Brand Already Exists");
        return;
    }

    brands.push(brand);

    localStorage.setItem("brands", JSON.stringify(brands));

    document.getElementById("brandName").value = "";

    loadBrands();

}

function loadBrands() {

    let table = document.getElementById("brandTable");

    if (!table) return;

    let brands = JSON.parse(localStorage.getItem("brands")) || [];

    table.innerHTML = "";

    brands.forEach(function(brand,index){

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${brand}</td>
            <td>
                <button class="delete"
                onclick="deleteBrand(${index})">
                Delete
                </button>
            </td>
        </tr>`;
    });

}

function deleteBrand(index){

    let brands = JSON.parse(localStorage.getItem("brands")) || [];

    brands.splice(index,1);

    localStorage.setItem("brands",JSON.stringify(brands));

    loadBrands();

}

window.addEventListener("load",function(){

    loadBrands();

});