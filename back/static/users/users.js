async function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    const list = document.getElementById('userList');
    await fetch('http://localhost:8080/api/users', {
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

async function addUser() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        email: document.getElementById('createEmail').value,
        password: document.getElementById('createPassword').value
    }
    await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {});

    document.getElementById('userList').innerHTML = "";
    init();
    document.getElementById('createUserForm').style.display = 'none';
}

async function editUser(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    const data = {
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value
    }

    await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    document.getElementById('userList').innerHTML = "";
    init();
    document.getElementById('editUserForm').style.display = 'none';
}

async function deleteUser(id) {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    document.getElementById('userList').innerHTML = "";
    init();
}