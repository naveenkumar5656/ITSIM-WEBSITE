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