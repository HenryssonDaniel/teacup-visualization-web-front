const ok = 200;

let page = 'signUp';

if (location.search === '?recover')
    page = 'recover';
else if (location.search === '?dashboard')
    page = 'dashboard';

window.onload = () => {
    document.getElementById('logIn').addEventListener('submit', event => {
        logIn(event.target);
        event.preventDefault();
    });

    loadMain();
};

function loadJavaScript(url) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            let script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';

            document.head.appendChild(script);
        }
    };


    xmlHttpRequest.open('HEAD', url, true);
    xmlHttpRequest.send();
}

function loadMain() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            document.getElementById('mainInner').insertAdjacentHTML('afterbegin', xmlHttpRequest.responseText);

            loadJavaScript(`js/${page}.js`);
        }
    };

    xmlHttpRequest.open('GET', `${page}.html`, true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/html');
    xmlHttpRequest.send();
}

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