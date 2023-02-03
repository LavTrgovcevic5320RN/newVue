async function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('scooterList');
    await fetch('http://localhost:8080/api/scooters', {
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

async function showScooterDetails(scooterId, id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/scooterdetails/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById('popupBoxTitle').textContent = scooterId;
            document.getElementById('detailsMaxWeight').textContent = data.maxWeight;
            document.getElementById('detailsElectric').textContent = data.electric;
            document.getElementById('detailsLength').textContent = data.length;
        })
}

async function addScooter() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        scooter: {
            manufacturer: document.getElementById('createManufacturer').value,
            model: document.getElementById('createModel').value,
            year: document.getElementById('createYear').value,
            detailsId: document.getElementById('createDetailsId').value,
            pricePerDay: document.getElementById('createPrice').value
        }
    }

    await fetch('http://localhost:8080/api/scooters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {});

    document.getElementById('scooterList').innerHTML = "";
    init();
    document.getElementById('createScooterForm').style.display = 'none';
}

async function editScooter(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        scooter: {
            manufacturer: document.getElementById('editManufacturer').value,
            model: document.getElementById('editModel').value,
            year: document.getElementById('editYear').value,
            detailsId: document.getElementById('editDetailsId').value,
            pricePerDay: document.getElementById('editPrice').value
        }
    };

    if(data.scooter.pricePerDay == '' || data.scooter.pricePerDay == undefined){
        data.scooter.pricePerDay = 10;
    }

    await fetch(`http://localhost:8080/api/scooters/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('scooterList').innerHTML = "";
    init();
    document.getElementById('editScooterForm').style.display = 'none';
}

async function deleteScooter(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/scooters/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('scooterList').innerHTML = "";
    init();
}
