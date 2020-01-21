function send() {

    const msgData = document.getElementById('textarea').value;
    console.log('send', msgData);
    document.getElementById('status').innerText = 'sending';
    navigator.serviceWorker.controller.postMessage({
        data: msgData
    });
}

navigator.serviceWorker.onmessage = (event) => {
    document.getElementById('response').innerText = JSON.stringify(event);
};