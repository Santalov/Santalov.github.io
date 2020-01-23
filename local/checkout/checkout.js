const origin = 'http://localhost:9001/local';
const methodName = origin + '/checkout';

let client;
let firstMsg;

navigator.serviceWorker.addEventListener('message', e => {
    firstMsg = e.data[0].data.data;
    document.getElementById('response').innerText = firstMsg;
    client = e.source;
});
navigator.serviceWorker.controller.postMessage('payment_app_window_ready');

function send() {
    const msg = document.getElementById('textarea').value;
    if (!client) return;
    const msgObject = {
        methodName: methodName,
        details: {
            firstMsg: firstMsg,
            secondMsg: msg,
        }
    };
    client.postMessage(msgObject);
}