document.getElementById('signUp').addEventListener('submit', event => {
    signUp(event.target);
    event.preventDefault();
});

function signUp(element) {
    const ok = 200;

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status !== ok)
            document.getElementById('signUpError').textContent = "Something went wrong, try again later";
    };

    xmlHttpRequest.open('POST', `${location.protocol}//${location.hostname}:5000/api/account/signUp`, true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/plain');
    xmlHttpRequest.send(`{"email":"${element.querySelector('input[name="email"]').value}",
    "firstName":"${element.querySelector('input[name="firstName"]').value}", 
    "lastName":"${element.querySelector('input[name="lastName"]').value}",
    "password":"${element.querySelector('input[name="password"]').value}"}`);
}