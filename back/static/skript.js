function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    console.log(token);
}