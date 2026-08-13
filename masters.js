function saveMaster() {

    let masterType = document.getElementById("masterType").value;
    let masterName = document.getElementById("masterName").value.trim();

    if (masterName == "") {
        alert("Please Enter Name");
        return;
    }

    // localStorage key
    let data = JSON.parse(localStorage.getItem(masterType)) || [];

    // Duplicate Check
    let exists = data.some(item => item.toLowerCase() === masterName.toLowerCase());

    if (exists) {
        alert(masterType + " Already Exists");
        return;
    }

    data.push(masterName);

    localStorage.setItem(masterType, JSON.stringify(data));

    document.getElementById("masterName").value = "";

    loadMaster();

}

function loadMaster() {

    let masterType = document.getElementById("masterType").value;

    let data = JSON.parse(localStorage.getItem(masterType)) || [];

    let table = document.getElementById("masterTable");

    table.innerHTML = "";

    data.forEach((item,index)=>{

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${item}</td>
        </tr>
        `;

    });

}

document.getElementById("masterType").addEventListener("change",loadMaster);

window.onload = loadMaster;