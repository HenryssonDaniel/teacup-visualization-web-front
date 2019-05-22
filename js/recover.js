document.getElementById('recover').addEventListener('submit', event => {
    recover(event.target);
    event.preventDefault();
});

function recover(element) {
    const ok = 200;

    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
            let recoverMessage = document.getElementById('recoverMessage');
            let content;

            if (this.status === ok) {
                content = 'A link to recover your account has been sent to your email';
            } else {
                content = 'Something went wrong, try again later';
                recoverMessage.className = 'error';
            }

            recoverMessage.textContent = content;
        }
    };

    xmlHttpRequest.open('POST', '/recover', true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
    xmlHttpRequest.send(`{"email":"${element.querySelector('input[name="email"]').value}"}`);
}