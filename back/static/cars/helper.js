function showCreateForm() {
    document.getElementById('createCarForm').style.display = 'block';
}

function appendListItem(list, item) {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${item.id}, Manufacturer: ${item.manufacturer}, Model: ${item.model}, Year: ${item.year}, Details id: ${item.detailsId}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', showEditForm.bind(null, item.id, item.manufacturer, item.model, item.year, item.detailsId));
    editButton.setAttribute('class', 'listItemControl');
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteCar.bind(null, item.id));
    deleteButton.setAttribute('class', 'listItemControl');
    listItem.appendChild(deleteButton);

    const detailsLink = document.createElement('a');
    detailsLink.textContent = 'Details';
    detailsLink.setAttribute('href', '#popup1');
    detailsLink.addEventListener('click', showCarDetails.bind(null, item.id, item.detailsId));
    detailsLink.setAttribute('class', 'listItemControl');
    listItem.appendChild(detailsLink);

    list.appendChild(listItem);
}

function showEditForm(id, manufacturer, model, year, detailsId) {
    const editForm = document.getElementById('editCarForm');
    editForm.style.display = 'block';
    let button;
    if (!document.getElementById('editButton')) {
        button = document.createElement('button');
    } else {
        button = document.getElementById('editButton');
    }
    editForm.appendChild(button);
    document.getElementById('editManufacturer').value = manufacturer;
    document.getElementById('editModel').value = model;
    document.getElementById('editYear').value = year;
    document.getElementById('editDetailsId').value = detailsId;
    button.textContent = 'Edit';
    button.setAttribute('id', 'editButton');
    button.setAttribute('onclick', `editCar(${id})`);
}
