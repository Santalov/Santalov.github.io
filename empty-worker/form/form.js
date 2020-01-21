function send() {
    const msgData = document.getElementById('textarea').value;
    navigator.serviceWorker.controller.postMessage({
        data: msgData, resolver: (responseMsg) => {
            document.getElementById('response').innerText = responseMsg;
        }
    });
}