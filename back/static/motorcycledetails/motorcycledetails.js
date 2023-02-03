async function init() {
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('detailsList');
    await fetch('http://localhost:8080/api/motorcycledetails', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        }
    })
        .then(res => res.json())
        .then(data => {
            data.data.forEach(element => {
                appendListItem(list, element);
            })
        })
}

async function addDetails() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        wheels: document.getElementById('createWheels').value,
        seats: document.getElementById('createSeats').value,
        maxSpeed: document.getElementById('createMaxSpeed').value,
        maxWeight: document.getElementById('createMaxWeight').value,
        type: document.getElementById('createType').value
    }

    await fetch('http://localhost:8080/api/motorcycledetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {});

    document.getElementById('detailsList').innerHTML = "";
    init();
    document.getElementById('createDetailsForm').style.display = 'none';
}

async function editDetails(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        wheels: document.getElementById('editWheels').value,
        seats: document.getElementById('editSeats').value,
        maxSpeed: document.getElementById('editMaxSpeed').value,
        maxWeight: document.getElementById('editMaxWeight').value,
        type: document.getElementById('editType').value
    }

    await fetch(`http://localhost:8080/api/motorcycledetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('detailsList').innerHTML = "";
    init();
    document.getElementById('editDetailsForm').style.display = 'none';
}

async function deleteDetails(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/motorcycledetails/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('detailsList').innerHTML = "";
    init();
}