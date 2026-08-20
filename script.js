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
        
        lowStockQty: document.getElementById("lowStockQty") ?
        document.getElementById("lowStockQty").value : "",

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
        
        lowStock: document.getElementById("lowStock") ?
        document.getElementById("lowStock").value : 0,

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

function deleteCategory() {

    let category = document.getElementById("categoryName").value.trim();

    if (category === "") {
        alert("Please Enter Category Name to Delete");
        return;
    }

    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    let index = categories.findIndex(
        c => c.toLowerCase() === category.toLowerCase()
    );

    if (index === -1) {
        alert("Category Not Found");
        return;
    }

    if (!confirm("Are you sure you want to delete this category?")) {
        return;
    }

    categories.splice(index, 1);

    localStorage.setItem("categories", JSON.stringify(categories));

    document.getElementById("categoryName").value = "";

    loadCategories();

    alert("✅ Category Deleted Successfully");
}

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

    loadBrandDropdown();

    loadItemNameDropdown();

    loadItemCategory();

    loadItemNames();

    loadCategoryDropdown();

    loadSpecifications();

    loadTransferItemDropdown();

});

function loadBrandDropdown() {

    let brandDropdown = document.getElementById("brand");

    if (!brandDropdown) return;

    let brands = JSON.parse(localStorage.getItem("brands")) || [];

    brandDropdown.innerHTML = '<option value="">-- Select Brand --</option>';

    brands.forEach(function(brand){

        brandDropdown.innerHTML += `
            <option value="${brand}">${brand}</option>
        `;

    });

}

// ================= ITEM NAME MASTER =================

function saveItemName(){

    let category=document.getElementById("category").value;

    let itemName=document.getElementById("itemName").value.trim();

    if(category=="" || itemName==""){
        alert("Select Category and Enter Item Name");
        return;
    }

    let itemNames=JSON.parse(localStorage.getItem("itemNames")) || [];

    let exists=itemNames.some(x =>
        x.category===category &&
        x.itemName.toLowerCase()===itemName.toLowerCase()
    );

    if(exists){
        alert("Item Name Already Exists");
        return;
    }

    itemNames.push({
        category:category,
        itemName:itemName
    });

    localStorage.setItem("itemNames",JSON.stringify(itemNames));

    alert("Item Name Saved Successfully");

    document.getElementById("itemName").value="";

    loadItemNames();

}

function loadItemNames(){

    let table=document.getElementById("itemNameTable");

    if(!table) return;

    let itemNames=JSON.parse(localStorage.getItem("itemNames")) || [];

    table.innerHTML="";

    itemNames.forEach(function(item,index){

        table.innerHTML+=`
        <tr>

            <td>${index+1}</td>

            <td>${item.category}</td>

            <td>${item.itemName}</td>

            <td>
                <button class="delete"
                onclick="deleteItemName(${index})">
                Delete
                </button>
            </td>

        </tr>
        `;

    });

}

function deleteItemName(index){

    let itemNames = JSON.parse(localStorage.getItem("itemNames")) || [];

    itemNames.splice(index,1);

    localStorage.setItem("itemNames",JSON.stringify(itemNames));

    loadItemNames();

}

function loadItemCategory(){

    let dropdown=document.getElementById("category");

    if(!dropdown) return;

    let categories=JSON.parse(localStorage.getItem("categories")) || [];

    dropdown.innerHTML='<option value="">-- Select Category --</option>';

    categories.forEach(function(category){

        dropdown.innerHTML += `
        
        <option value="${category}">
            ${category}
        </option>`;

    });

}

// ================= SPECIFICATION MASTER =================

function saveSpecification(){

    let category = document.getElementById("category").value;

    let brand = document.getElementById("brand").value;

    let itemName = document.getElementById("itemName").value;

    let specification = document.getElementById("specificationName").value.trim();

    if(category=="" || brand=="" || itemName=="" || specification==""){

        alert("Please fill all fields");

        return;

    }

    let specifications = JSON.parse(localStorage.getItem("specifications")) || [];

    let exists = specifications.some(x =>

        x.category===category &&

        x.brand===brand &&

        x.itemName===itemName &&

        x.specification.toLowerCase()===specification.toLowerCase()

    );

    if(exists){

        alert("Specification Already Exists");

        return;

    }

    specifications.push({

        category:category,

        brand:brand,

        itemName:itemName,

        specification:specification

    });

    localStorage.setItem("specifications",JSON.stringify(specifications));

    alert("Specification Saved Successfully");

    document.getElementById("specificationName").value="";

    loadSpecifications();

}

function loadSpecifications(){

    let table = document.getElementById("specificationTable");

    if(!table) return;

    let specifications = JSON.parse(localStorage.getItem("specifications")) || [];

    table.innerHTML = "";

    specifications.forEach(function(spec,index){

        table.innerHTML += `
        <tr>

            <td>${index+1}</td>

            <td>${spec.category}</td>

            <td>${spec.brand}</td>

            <td>${spec.itemName}</td>

            <td>${spec.specification}</td>

            <td>
                <button class="delete"
                onclick="deleteSpecification(${index})">
                Delete
                </button>
            </td>

        </tr>
        `;

    });

}

function deleteSpecification(index){

    let specifications = JSON.parse(localStorage.getItem("specifications")) || [];

    specifications.splice(index,1);

    localStorage.setItem("specifications",JSON.stringify(specifications));

    loadSpecifications();

}

function loadItemNameDropdown(){

    let dropdown = document.getElementById("itemname");

    if(!dropdown) return;

    let itemNames = JSON.parse(localStorage.getItem("itemNames")) || [];

    dropdown.innerHTML = '<option value="">-- Select Item Name --</option>';

    itemNames.forEach(function(item){

        dropdown.innerHTML += `
        <option value="${item.itemName}">
            ${item.itemName}
        </option>`;

    });

}

function loadTransferItemDropdown(){

    let dropdown = document.getElementById("transferItem");

    if(!dropdown) return;

    let itemNames = JSON.parse(localStorage.getItem("itemNames")) || [];

    dropdown.innerHTML = '<option value="">-- Select Item --</option>';

    itemNames.forEach(function(item){

        dropdown.innerHTML += `
            <option value="${item.itemName}">
                ${item.itemName}
            </option>
        `;

    });

}