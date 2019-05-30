document.getElementById('logIn').addEventListener('submit', event => {
    logIn(event.target);
    event.preventDefault();
});

function logIn(element) {
    const unauthorized = 401;

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4)
            if (this.status === ok)
                location.replace('?dashboard');
            else
                document.getElementById('logInError').textContent = this.status === unauthorized
                    ? 'Incorrect credentials' : 'Something went wrong, try again later';
    };

    xmlHttpRequest.open('POST', `${location.protocol}//${location.hostname}:5000/api/account/logIn`, true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/plain');
    xmlHttpRequest.withCredentials = true;
    xmlHttpRequest.send(`{"email":"${element.querySelector('input[name="email"]').value}", 
    "password":"${element.querySelector('input[name="password"]').value}"}`);
}