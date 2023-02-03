async function init() {
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const list = document.getElementById('reservationList');
    await fetch('http://localhost:8080/api/reservations', {
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

async function addReservation() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        startDate: document.getElementById('createStartDate').value,
        endDate: document.getElementById('createEndDate').value,
        carId: document.getElementById('createCarId').value,
        bicycleId: document.getElementById('createBicycleId').value,
        scooterId: document.getElementById('createScooterId').value,
        motorcycleId: document.getElementById('createMotorcycleId').value,
        userId: document.getElementById('createUserId').value
    }
    if(data.carId === "" && data.bicycleId === "" && data.scooterId === "" && data.motorcycleId === ""){
        console.log("svi su prazni");
        data.carId = 2;
        data.bicycleId = 1;
        data.scooterId = 1;
        data.motorcycleId = 1;
    }

    if(data.carId === ""){
        data.carId = 1;
    }
    if(data.bicycleId === ""){
        data.bicycleId = 1;
    }
    if(data.scooterId === ""){
        data.scooterId = 1;
    }
    if(data.motorcycleId === ""){
        data.motorcycleId = 1;
    }

    await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {});

    document.getElementById('reservationList').innerHTML = "";
    init();
    document.getElementById('createReservationForm').style.display = 'none';
}

async function editReservation(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        startDate: document.getElementById('editStartDate').value,
        endDate: document.getElementById('editEndDate').value,
        carId: document.getElementById('editCarId').value,
        bicycleId: document.getElementById('editBicycleId').value,
        scooterId: document.getElementById('editScooterId').value,
        motorcycleId: document.getElementById('editMotorcycleId').value,
        userId: document.getElementById('editUserId').value
    }

    if(data.carId === "" && data.bicycleId === "" && data.scooterId === "" && data.motorcycleId === ""){
        console.log("svi su prazni");
        data.carId = 2;
        data.bicycleId = 1;
        data.scooterId = 1;
        data.motorcycleId = 1;
    }

    if(data.carId === ""){
        data.carId = 1;
    }
    if(data.bicycleId === ""){
        data.bicycleId = 1;
    }
    if(data.scooterId === ""){
        data.scooterId = 1;
    }
    if(data.motorcycleId === ""){
        data.motorcycleId = 1;
    }

    await fetch(`http://localhost:8080/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('reservationList').innerHTML = "";
    init();
    document.getElementById('editReservationForm').style.display = 'none';
}

async function deleteReservation(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('reservationList').innerHTML = "";
    init();
}