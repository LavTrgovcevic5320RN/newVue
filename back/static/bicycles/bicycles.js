async function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('bicycleList');
    await fetch('http://localhost:8080/api/bicycles', {
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

async function showBicycleDetails(bicycleId, id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/bicycles/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('popupBoxTitle').textContent = bicycleId;
            document.getElementById('detailsWheels').textContent = data.wheels;
            document.getElementById('detailsElectric').textContent = data.electric;
            document.getElementById('detailsSeats').textContent = data.seats;
        })
}

async function addBicycle() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        bicycle: {
            manufacturer: document.getElementById('createManufacturer').value,
            model: document.getElementById('createModel').value,
            year: document.getElementById('createYear').value,
            detailsId: document.getElementById('createDetailsId').value,
            pricePerDay: document.getElementById('createPrice').value
        }
    }
    
    await fetch('http://localhost:8080/api/bicycles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('bicycleList').innerHTML = "";
    init();
    document.getElementById('createBicycleForm').style.display = 'none';
}

async function editBicycle(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        bicycle: {
            manufacturer: document.getElementById('editManufacturer').value,
            model: document.getElementById('editModel').value,
            year: document.getElementById('editYear').value,
            detailsId: document.getElementById('editDetailsId').value,
            pricePerDay: document.getElementById('editPrice').value
        }
    };

    console.log(data);
    await fetch(`http://localhost:8080/api/bicycles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('bicycleList').innerHTML = "";
    init();
    document.getElementById('editBicycleForm').style.display = 'none';
}

async function deleteBicycle(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/bicycles/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('bicycleList').innerHTML = "";
    init();
}
