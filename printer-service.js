document.addEventListener("DOMContentLoaded", function () {

    loadServiceColleges();
    loadServiceDepartments();

});


// =====================================
// LOAD COLLEGE FROM MASTER
// =====================================

function loadServiceColleges() {

    const collegeSelect =
        document.getElementById("serviceCollege");

    const colleges =
        JSON.parse(
            localStorage.getItem("college")
        ) || [];

    collegeSelect.innerHTML =
        '<option value="">Select College</option>';

    colleges.forEach(function (college) {

        collegeSelect.innerHTML += `
            <option value="${college}">
                ${college}
            </option>
        `;

    });

}


// =====================================
// LOAD DEPARTMENT FROM MASTER
// =====================================

function loadServiceDepartments() {

    const departmentSelect =
        document.getElementById("serviceDepartment");

    const departments =
        JSON.parse(
            localStorage.getItem("department")
        ) || [];

    departmentSelect.innerHTML =
        '<option value="">Select Department</option>';

    departments.forEach(function (department) {

        departmentSelect.innerHTML += `
            <option value="${department}">
                ${department}
            </option>
        `;

    });

}

// =====================================
// LOAD PRINTER / TONER ITEMS
// =====================================

function loadServiceItems() {

    const type =
        document.getElementById("serviceType").value;

    const itemSelect =
        document.getElementById("serviceItem");

    itemSelect.innerHTML =
        '<option value="">Select Printer / Toner</option>';

    if (type === "") {
        return;
    }

    const itemNames =
        JSON.parse(
            localStorage.getItem("itemNames")
        ) || [];

    itemNames.forEach(function (item) {

        if (
            item.category &&
            item.category.toLowerCase() ===
            type.toLowerCase()
        ) {

            itemSelect.innerHTML += `
                <option value="${item.itemName}">
                    ${item.itemName}
                </option>
            `;

        }

    });

}


// =====================================
// PRINTER / TONER TYPE CHANGE
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const serviceType =
        document.getElementById("serviceType");

    if (serviceType) {

        serviceType.addEventListener(
            "change",
            loadServiceItems
        );

    }

});