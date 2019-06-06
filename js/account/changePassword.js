document.getElementById('changePassword').addEventListener('submit', event => {
    changePassword(event.target);
    event.preventDefault();
});

function changePassword(element) {
    const ok = 200;

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4)
            if (this.status === ok)
                location.replace('?dashboard');
            else
                document.getElementById('changePasswordMessage').textContent = 'Something went wrong, try again later';
    };

    xmlHttpRequest.open('POST', `${location.protocol}//${location.hostname}:5000/api/account/changePassword`,
        true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/plain');
    xmlHttpRequest.send(`{"password":"${element.querySelector('input[name="password"]').value}", 
    "token":"${element.querySelector('input[name="token"]').value}"}`);
}