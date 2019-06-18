const ok = 200;

window.onload = () => load();

let load = () => {
    let search = locationWrapper.search();
    if (search === '?changePassword' || search === '?recover' || search === '?signUp') {
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
};

let loadHeader = authorized => {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            document.getElementById('headerInner').insertAdjacentHTML('afterbegin',  xmlHttpRequest.responseText);

            loadJavaScript("header/" + (authorized ? "menu" : "logIn"));
        }
    };

    xmlHttpRequest.open('GET', "html/header/" + (authorized ? "menu" : "logIn") + ".html", true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/html');
    xmlHttpRequest.send();
};

let loadJavaScript = url => {
    let javaScript = `js/${url}.js`;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            let script = document.createElement('script');
            script.src = javaScript;
            script.type = 'text/javascript';

            document.head.appendChild(script);
        }
    };

    xmlHttpRequest.open('HEAD', javaScript, true);
    xmlHttpRequest.send();
};

let loadMain = page => {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === ok) {
            document.getElementById('mainInner').insertAdjacentHTML('afterbegin', xmlHttpRequest.responseText);

            loadJavaScript(page);
        }
    };

    xmlHttpRequest.open('GET', `html/${page}.html`, true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/html');
    xmlHttpRequest.send();
};

let locationWrapper = {
    search: () => location.search
};