async function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('motorcycleList');
    await fetch('http://localhost:8080/api/motorcycles', {
        headers: {
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

async function showMotorcycleDetails(motorcycleId, id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/motorcycledetails/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('popupBoxTitle').textContent = motorcycleId;
            document.getElementById('detailsWheels').textContent = data.wheels;
            document.getElementById('detailsSeats').textContent = data.seats;
            document.getElementById('detailsMaxSpeed').textContent = data.maxSpeed;
            document.getElementById('detailsMaxWeight').textContent = data.maxWeight;
            document.getElementById('detailsType').textContent = data.type;
        })
}

async function addMotorcycle() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        motorcycle: {
            manufacturer: document.getElementById('createManufacturer').value,
            model: document.getElementById('createModel').value,
            year: document.getElementById('createYear').value,
            detailsId: document.getElementById('createDetailsId').value,
            pricePerDay: document.getElementById('createPrice').value
        }
    }

    await fetch('http://localhost:8080/api/motorcycles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {});

    document.getElementById('motorcycleList').innerHTML = "";
    init();
    document.getElementById('createMotorcycleForm').style.display = 'none';
}

async function editMotorcycle(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        motorcycle: {
            manufacturer: document.getElementById('editManufacturer').value,
            model: document.getElementById('editModel').value,
            year: document.getElementById('editYear').value,
            detailsId: document.getElementById('editDetailsId').value,
            pricePerDay: document.getElementById('editPrice').value
        }
    };

    if(data.motorcycle.pricePerDay == '' || data.motorcycle.pricePerDay == undefined){
        data.motorcycle.pricePerDay = 10;
    }

    await fetch(`http://localhost:8080/api/motorcycles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('motorcycleList').innerHTML = "";
    init();
    document.getElementById('editMotorcycleForm').style.display = 'none';
}

async function deleteMotorcycle(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/motorcycles/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('motorcycleList').innerHTML = "";
    init();
}
