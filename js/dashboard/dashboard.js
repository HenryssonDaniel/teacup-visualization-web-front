const DASHBOARD_MESSAGE = 'dashboardMessage';
const END = 19;
const UNAUTHORIZED = 401;

let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function() {
    if (this.readyState === 4)
        if(this.status === UNAUTHORIZED)
            location.replace('?signUp');
        else {
            let json = JSON.parse(this.responseText);

            let account = json["account"];
            document.getElementById('name').textContent = account["firstName"] + " " + account["lastName"];

            if (this.status === ok) {
                let sessions = json["sessions"];

                let length = Object.keys(sessions).length;

                if (length === 0)
                    document.getElementById(DASHBOARD_MESSAGE).textContent = 'No sessions available yet';
                else {
                    let sessionsElement = document.getElementById('sessions');

                    for (let i = 0; i < length; i++) {
                        let sessionElement = document.createElement('div');
                        let session = sessions[i];

                        sessionElement.textContent = 'Aborted: ' + session['aborted'] + ', ' + 'Executions: ' +
                            session['executions'] + ', ' + 'Failed: ' + session['failed'] + ', ' + 'Initialized: ' +
                            session['initialized'].slice(0, END) + ', ' + 'Running: ' + session['running'] + ', ' +
                            'Skipped: ' + session['skipped'] + ', ' + 'Successful: ' + session['successful'];

                        sessionsElement.appendChild(sessionElement);
                    }
                }
            } else {
                let dashboardMessage = document.getElementById(DASHBOARD_MESSAGE);
                dashboardMessage.className = 'error';
                dashboardMessage.textContent = 'Something went wrong, try again later';
            }
        }
};

xmlHttpRequest.open('GET', `${location.protocol}//${location.hostname}:5000/api/dashboard`, true);
xmlHttpRequest.withCredentials = true;
xmlHttpRequest.send();