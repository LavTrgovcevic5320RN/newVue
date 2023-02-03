function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'index.html';
                }
            });
    });
}