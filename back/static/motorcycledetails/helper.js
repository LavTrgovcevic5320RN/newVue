function showCreateForm() {
    document.getElementById('createDetailsForm').style.display = 'block';
}

function appendListItem(list, item) {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${item.id}, Wheels: ${item.wheels}, Seats: ${item.seats}, maxSpeed: ${item.maxSpeed}, maxWeight: ${item.maxWeight}, type: ${item.type}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', showEditForm.bind(null, item.id, item.wheels, item.seats, item.maxSpeed, item.maxWeight, item.type));
    editButton.setAttribute('class', 'listItemControl');
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteDetails.bind(null, item.id));
    deleteButton.setAttribute('class', 'listItemControl');
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
}

function showEditForm(id, wheels, seats, maxSpeed, maxWeight, type) {
    const editForm = document.getElementById('editDetailsForm');
    editForm.style.display = 'block';
    let button;
    if (!document.getElementById('editButton')) {
        button = document.createElement('button');
    } else {
        button = document.getElementById('editButton');
    }
    editForm.appendChild(button);
    document.getElementById('editWheels').value = wheels;
    document.getElementById('editSeats').value = seats;
    document.getElementById('editMaxSpeed').value = maxSpeed;
    document.getElementById('editMaxWeight').value = maxWeight;
    document.getElementById('editType').value = type;
    button.textContent = 'Edit';
    button.setAttribute('id', 'editButton');
    button.setAttribute('onclick', `editDetails(${id})`);
}