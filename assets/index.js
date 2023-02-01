let items = [];
const itemsKey = items

const createForm = document.getElementById("create-form");
const itemsTable = document.getElementById("items-table");
const itemsTBody = document.getElementById("items-tbody");
const updateForm = document.getElementById("update-form");
const cancelUpdateBtn = document.getElementById("cancel-update-btn");

/* Nota Personal: Con getElementById traemos todos los ID previamente creados para interactuar con ellos */

createForm.addEventListener("submit", e => {
    e.preventDefault();
    const itemName = document.getElementById("item-name").value;
    const sector = document.getElementById("sector").value;
    items.push({ id: Date.now(), itemName, sector });
    renderItems(); /*Aqui creamos el formulario a leer*/
    createForm.reset();
});

/* Nota Personal: Aqui utilizamos "createForm" para agregar los nuevos objetos al inventario */

function renderItems() {
    itemsTBody.innerHTML = "";
    items.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.sector}</td>
            <td>
                <button data-id="${item.id}" class="update-btn">Update</button>
                <button data-id="${item.id}" class="delete-btn">Delete</button>
            </td>
        `;
        itemsTBody.appendChild(tr);
        if (localStorage.getItem("itemsKey") == null) {
            localStorage.setItem("itemsKey", JSON.stringify(itemsKey))
            } else {
                itemsKey = JSON.parse(localStorage.getItem("itemsKey"));
                renderItems ();
            }
    });
}

itemsTable.addEventListener("click", e => {
    if (e.target.classList.contains("update-btn")) {
        const id = e.target.dataset.id;
        const item = items.find(item => item.id === Number(id));
        document.getElementById("update-item-name").value = item.itemName;
        document.getElementById("update-sector").value = item.sector;
        document.getElementById("update-id").value = item.id;
        document.getElementById("update-section").style.display = "block";
    } else if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        items.splice(items.findIndex(item => item.id === Number(id)), 1);
        renderItems();
    }
});

updateForm.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("update-id").value;
    const itemName = document.getElementById("update-item-name").value;
    const sector = document.getElementById("update-sector").value;
    items.find(item => item.id === Number(id)).itemName = itemName;
    items.find(item => item.id === Number(id)).sector = sector;
    renderItems();
    updateForm.reset();
    document.getElementById("update-section").style.display = "none";
});

cancelUpdateBtn.addEventListener("click", e => {
    updateForm.reset();
    document.getElementById("update-section").style.display = "none";
});