const ok = 200;

window.onload = () => load();

function load() {
    let search = location.search;
    if (search === '?recover' || search === '?signUp') {
        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function() {
            if (this.readyState === 4) {
                let authorized;
                let page;

                if (this.status === ok) {
                    authorized = true;
                    page = 'dashboard/dashboard';
                } else {
                    authorized = false;
                    page = `account/${search.substr(1)}`;
                }

                loadHeader(authorized);
                loadMain(page);
            }
        };
        xmlHttpRequest.withCredentials = true;

        xmlHttpRequest.open('GET', `${location.protocol}//${location.hostname}:5000/api/account/authorized`, true);
        xmlHttpRequest.send();
    } else {
        loadHeader(true);
        loadMain('dashboard/dashboard');
    }
}

function loadHeader(authorized) {
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

function loadMain(page) {
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