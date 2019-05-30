document.getElementById('logout').addEventListener('click', event => {
    logout();
    event.preventDefault();
});

function logout() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4)
            location.replace('?signUp');
    };

    xmlHttpRequest.open('POST', `${location.protocol}//${location.hostname}:5000/api/account/logout`, true);
    xmlHttpRequest.withCredentials = true;
    xmlHttpRequest.send();
}