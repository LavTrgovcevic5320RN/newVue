async function init() {
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('detailsList');
    await fetch('http://localhost:8080/api/cardetails', {
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
        doors: document.getElementById('createDoors').value,
        fuel: document.getElementById('createFuel').value,
        transmission: document.getElementById('createTransmission').value
    }

    await fetch('http://localhost:8080/api/cardetails', {
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
        doors: document.getElementById('editDoors').value,
        fuel: document.getElementById('editFuel').value,
        transmission: document.getElementById('editTransmission').value
    }

    await fetch(`http://localhost:8080/api/cardetails/${id}`, {
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
    await fetch(`http://localhost:8080/api/cardetails/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('detailsList').innerHTML = "";
    init();
}