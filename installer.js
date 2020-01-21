navigator.serviceWorker
    .register('worker.js')
    .then(() => {
        return navigator.serviceWorker.ready;
    })
    .then(registration => {
        if (!registration.paymentManager) {
            alert(
                'No payment handler capability in this browser. Is chrome://flags/#service-worker-payment-apps enabled?',
            );
            return;
        }
        if (!registration.paymentManager.instruments) {
            alert(
                'Payment handler is not fully implemented. Cannot set the instruments.',
            );
            return;
        }
        registration.paymentManager.instruments
            .set('instrument-key', {
                name: 'Chrome uses name and icon from the web app manifest',
                method: window.location.href,
            })
            .then(() => {
                registration.paymentManager.instruments
                    .get('instrument-key')
                    .then(instrument => {
                        console.log('service worker installed', 'scope', registration.scope, 'method', instrument.method);
                    })
                    .catch(error => {
                        alert(error);
                    });
            })
            .catch(error => {
                alert(error);
            });
    })
    .catch(error => {
        alert(error);
    });