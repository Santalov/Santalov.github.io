function send() {

    const msgData = document.getElementById('textarea').value;
    console.log('send', msgData);
    document.getElementById('status').innerText = 'sending';
    navigator.serviceWorker.controller.postMessage({
        data: msgData, resolver: (responseMsg) => {
            document.getElementById('response').innerText = responseMsg;
        }
    });
}