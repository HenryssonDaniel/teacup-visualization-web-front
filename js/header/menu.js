document.getElementById('logOut').addEventListener('click', event => {
    logOut();
    event.preventDefault();
});

function logOut() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4)
            location.replace('?signUp');
    };

    xmlHttpRequest.open('POST', `${location.protocol}//${location.hostname}:5000/api/account/logOut`, true);
    xmlHttpRequest.withCredentials = true;
    xmlHttpRequest.send();
}