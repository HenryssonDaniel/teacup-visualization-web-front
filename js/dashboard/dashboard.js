const unauthorized = 401;

let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function() {
    if (this.readyState === 4)
        if(this.status === unauthorized)
            location.replace('?signUp');
        else {
            let json = JSON.parse(this.responseText);
            document.getElementById('name').textContent = json["firstName"] + " " + json["lastName"];

            if (this.status !== ok)
                document.getElementById('dashboardError').textContent = 'Something went wrong, try again later';
        }
};

xmlHttpRequest.open('GET', `${location.protocol}//${location.hostname}:5000/api/dashboard`, true);
xmlHttpRequest.withCredentials = true;
xmlHttpRequest.send();