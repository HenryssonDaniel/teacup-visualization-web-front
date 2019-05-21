const ok = 200;
let page = 'signUp';

if (window.location.search === '?recover') {
    page = 'recover';
}

window.onload = () => {
    document.getElementById('logIn').addEventListener('submit', event => {
        logIn(event.target);
        event.preventDefault();
    });

    loadMain();
};

function loadMain() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            document.getElementById('mainInner').insertAdjacentHTML('afterbegin', xmlHttpRequest.responseText);

            let script = document.createElement('script');
            script.src = `js/${page}.js`;
            script.type = 'text/javascript';

            document.head.appendChild(script);
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
        if (this.readyState === 4 && this.status !== ok) {
            let content;

            if (this.status === unauthorized) {
                content = 'Incorrect credentials';
            } else {
                content = 'Something went wrong, try again later';
            }

            document.getElementById('logInError').textContent = content;
        }
    };

    xmlHttpRequest.open('POST', 'localhost/logIn', true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
    xmlHttpRequest.send(`{"email":"${element.querySelector('input[name="email"]').value}", 
    "password":"${element.querySelector('input[name="password"]').value}"}`);
}