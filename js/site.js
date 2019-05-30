const ok = 200;

let authorized = false;
let page = "";

let search = location.search;
if (search === '?recover' || search === '?signUp') {
    page = `account/${search.substr(1)}`;
} else {
    authorized = true;
    page = 'dashboard/dashboard';
}

window.onload = () => load();

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

function load() {
    loadHeader();
    loadMain();
}

function loadHeader() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            document.getElementById('headerInner').insertAdjacentHTML('afterbegin',  xmlHttpRequest.responseText);

            loadJavaScript("js/header/" + (authorized ? "menu" : "logIn") + ".js");
        }
    };

    xmlHttpRequest.open('GET', "html/header/" + (authorized ? "menu" : "logIn") + ".html", true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/html');
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

    xmlHttpRequest.open('GET', `html/${page}.html`, true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/html');
    xmlHttpRequest.send();
}