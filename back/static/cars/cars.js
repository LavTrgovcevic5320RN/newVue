async function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('carList');
    await fetch('http://localhost:8080/api/cars', {
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

async function showCarDetails(carId, id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/cardetails/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('popupBoxTitle').textContent = carId;
            document.getElementById('detailsDoors').textContent = data.doors;
            document.getElementById('detailsFuel').textContent = data.fuel;
            document.getElementById('detailsTransmission').textContent = data.transmission;
        })
}

async function addCar() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        car: {
            manufacturer: document.getElementById('createManufacturer').value,
            model: document.getElementById('createModel').value,
            year: document.getElementById('createYear').value,
            detailsId: document.getElementById('createDetailsId').value,
            pricePerDay: document.getElementById('createPrice').value
        }
    }

    await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {});

    document.getElementById('carList').innerHTML = "";
    init();
    document.getElementById('createCarForm').style.display = 'none';
}

async function editCar(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        car: {
            manufacturer: document.getElementById('editManufacturer').value,
            model: document.getElementById('editModel').value,
            year: document.getElementById('editYear').value,
            detailsId: document.getElementById('editDetailsId').value,
            pricePerDay: document.getElementById('editPrice').value
        }
    };

    if(data.car.pricePerDay == '' || data.car.pricePerDay == undefined){
        data.car.pricePerDay = 10;
    }

    await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('carList').innerHTML = "";
    init();
    document.getElementById('editCarForm').style.display = 'none';
}

async function deleteCar(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('carList').innerHTML = "";
    init();
}
