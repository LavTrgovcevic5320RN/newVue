function showCreateForm() {
    document.getElementById('createReservationForm').style.display = 'block';
}

function appendListItem(list, item) {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${item.id}, Start date: ${item.startDate}, End date: ${item.endDate}, Car id: ${item.carId}, Bicycle id: ${item.bicycleId}, Scooter id: ${item.scooterId},  Motorcycle id: ${item.motorcycleId}, User id: ${item.userId}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', showEditForm.bind(null, item.id, item.startDate, item.endDate, item.carId, item.bicycleId, item.scooterId, item.motorcycleId, item.userId));
    editButton.setAttribute('class', 'listItemControl');
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteReservation.bind(null, item.id));
    deleteButton.setAttribute('class', 'listItemControl');
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
}



function showEditForm(id, startDate, endDate, carId, bicycleId, scooterId, motorcycleId, userId) {
    const editForm = document.getElementById('editReservationForm');
    editForm.style.display = 'block';
    let button;
    if (!document.getElementById('editButton')) {
        button = document.createElement('button');
    } else {
        button = document.getElementById('editButton');
    }
    editForm.appendChild(button);
    document.getElementById('editStartDate').value = startDate;
    document.getElementById('editEndDate').value = endDate;
    document.getElementById('editCarId').value = carId;
    document.getElementById('editBicycleId').value = bicycleId;
    document.getElementById('editScooterId').value = scooterId;
    document.getElementById('editMotorcycleId').value = motorcycleId;
    document.getElementById('editUserId').value = userId;
    button.textContent = 'Edit';
    button.setAttribute('id', 'editButton');
    button.setAttribute('onclick', `editReservation(${id})`);
}