document.getElementById('recover').addEventListener('submit', event => {
    recover(event.target);
    event.preventDefault();
});

function recover(element) {
    const ok = 200;

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4)
            if (this.status === ok)
                location.replace('?changePassword');
            else
                document.getElementById('recoverMessage').textContent = 'Something went wrong, try again later';
    };

    xmlHttpRequest.open('POST', `${location.protocol}//${location.hostname}:5000/api/account/recover`, true);
    xmlHttpRequest.setRequestHeader('Content-type', 'text/plain');
    xmlHttpRequest.send(`{"email":"${element.querySelector('input[name="email"]').value}"}`);
}