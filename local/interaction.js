let client; // наличие client также свидетельствует об активной подписке

function subscribeMessages() {
    navigator.serviceWorker.addEventListener('message', e => {
        console.log('got response message', e);
        if (client) {
            View.postResponse().innerText = e.data;
        }
        client = e.source;
    });
    navigator.serviceWorker.controller.postMessage('installer_page_ready_for_interaction')
    console.log('subscribed');
}

function sendMessage() {
    subscribeMessages();
    const msg = View.postMessage().value;
    if (client) {
        View.postMessage().value = '';
        View.postResponse().innerText = '';
        client.postMessage(msg);
        View.postStatus().innerText = 'Сообщение отправлено';
    }
}

function checkPostMessage() {
    if (!navigator.serviceWorker.controller) {
        View.hide('postMessage');
        View.show('postMessageReload');
        return;
    }
    subscribeMessages();
}

checkPostMessage();

function openWindow() {
    try {
        View.paymentsResponse().innerText = '';
        View.postStatus().innerText = 'Открытие диалога';
        const msg = View.paymentsMessage().value;
        View.paymentsMessage().value = '';
        const request = new PaymentRequest([{
            supportedMethods: window.location + '/checkout',
            data: {
                data: msg
            }
        }], {
            total: {
                label: 'N/A',
                amount: {
                    currency: 'USD',
                    value: '0.00'
                }
            }
        });
        request.show()
            .then(response => {
                if (response.details) {
                    if (typeof response.details === 'string') {
                        View.paymentsResponse().innerText = response.details;
                    } else {
                        View.paymentsResponse().innerText = JSON.stringify(response.details);
                    }
                }
                response.complete('success')
                    .catch(err => {
                        console.error(err);
                        View.paymentsStatus().innerText = err;
                    })
            })
            .catch(err => {
                console.error(err);
                View.paymentsStatus().innerText = err;
            })
    } catch (e) {
        console.error(e);
        View.paymentsStatus.innerText = e;
    }
}