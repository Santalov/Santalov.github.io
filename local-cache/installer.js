// класс со статичными методами для взаимодействия с DOM

class View {
    static get(id) {
        return document.getElementById(id);
    }

    static show(id) {
        View.get(id).style.display = 'block';
    }

    static hide(id) {
        View.get(id).style.display = 'none';
    }

    static paymentsMessage() {
        return View.get('paymentsMessage');
    }

    static paymentsResponse() {
        return View.get('paymentsResponse');
    }

    static paymentsStatus() {
        return View.get('paymentsStatus');
    }

    static postMessage() {
        return View.get('postMessage');
    }

    static postResponse() {
        return View.get('postResponse');
    }

    static postStatus() {
        return View.get('postStatus');
    }

    static status() {
        return View.get('statusService');
    }

    static showStatus(status) {
        View.status.innerText = status + '';
        console.log('status: ', status);
    }

    static hideWorkerStatuses() {
        const statusesSections = [
            'checking',
            'installed',
            'installing',
            'uninstalling',
            'not-installed',
        ];

        for (const id of statusesSections) {
            View.hide(id);
        }
    }

    static clearInteractionFields() {
        View.paymentsMessage().value = '';
        View.paymentsResponse().innerText = '';
        View.paymentsStatus().innerText = '';
        View.postMessage().value = '';
        View.postResponse().innerText = '';
        View.postStatus().innerText = '';
    }
}

// работа с service worker

// класс со статичными методами для проверки подержки браузером всех функций.
class Check {
    static paymentManager(registration, hide, show) {
        if (registration.paymentManager) {
            return true;
        } else {
            View.showStatus('No payment handler capability in this browser');
            if (hide) {
                View.hide(hide);
            }
            if (show) {
                View.show(show);
            }
            return false;
        }
    }

    static instruments(registration, hide, show) {
        if (registration.paymentManager.instruments) {
            return true;
        } else {
            View.showStatus('Payment handler is not fully implemented. Cannot set the instruments.');
            if (hide) {
                View.hide(hide);
            }
            if (show) {
                View.show(show);
            }
            return false;
        }
    }

    static serviceWorker(hide, show) {
        if (navigator.serviceWorker) {
            return true;
        } else {
            View.showStatus('No service worker capability in this browser');
            if (hide) {
                View.hide(hide);
            }
            if (show) {
                View.show(show);
            }
            return false;
        }
    }
}

function installServiceWorker() {
    View.clearInteractionFields();
    View.hideWorkerStatuses();
    View.show('installing');
    if (!Check.serviceWorker('installing')) {
        return;
    }
    navigator.serviceWorker
        .register('worker.js')
        .then(preRegistration => {

            if (!Check.paymentManager(preRegistration, 'installing')) {
                return;
            }
            if (!Check.instruments(preRegistration, 'installing')) {
                return;
            }

            navigator.serviceWorker.ready
                .then(registration => {
                    registration.paymentManager.instruments
                        .set(
                            'demo',
                            {
                                name: 'Service Worker Demo',
                                method: window.location.href + 'checkout'
                            }
                        )
                        .then(() => {

                            registration.paymentManager.instruments
                                .get('instrument-key')
                                .then(instrument => {

                                    View.get('scope').innerText = registration.scope;
                                    if (instrument) {
                                        View.get('method').innerText = instrument.method;
                                    }
                                    View.hide('installing');
                                    View.show('installed');
                                })
                                .catch(err => {
                                    View.hide('installing');
                                    View.showStatus(err);
                                });
                        })
                        .catch(err => {
                            View.hide('installing');
                            View.showStatus(err);
                        });
                })
                .catch(err => {
                    View.hide('installing');
                    View.showStatus(err);
                });
        })
        .catch(err => {
            View.hide('installing');
            View.showStatus(err);
        });
}

function uninstallServiceWorker() {
    View.hideWorkerStatuses();
    View.show('uninstalling');

    if (!Check.serviceWorker('uninstalling')) {
        return;
    }

    navigator.serviceWorker
        .getRegistration('worker.js')
        .then(registration => {
            registration.unregister()
                .then(result => {
                    if (result) {
                        View.hide('uninstalling');
                        View.show('not-installed');
                    } else {
                        View.hide('uninstalling');
                        View.show('installed');
                        View.showStatus('Service worker not removed');
                    }
                })
                .catch(err => {
                    View.hide('uninstalling');
                    View.showStatus(err);
                })
        })
        .catch(err => {
            View.hide('uninstalling');
            View.showStatus(err);
        })
}

function checkInstallation() {
    View.clearInteractionFields();
    View.hideWorkerStatuses();
    View.show('checking');

    if (!Check.serviceWorker('checking')) {
        return;
    }

    navigator.serviceWorker
        .getRegistration('worker.js')
        .then(registration => {
            if (!registration) {
                View.hide('checking');
                View.show('not-installed');
                return;
            }
            View.get('scope').innerText = registration.scope;
            if (!Check.paymentManager(registration, 'checking', 'not-installed')) {
                return;
            }
            if (!Check.instruments(registration, 'checking', 'not-installed')) {
                return;
            }
            registration.paymentManager.instruments
                .get('instrument-key')
                .then(instrument => {
                    View.get('scope').innerText = registration.scope;
                    if (instrument) {
                        View.get('method').innerText = instrument.method;
                    }
                    View.hide('checking');
                    View.show('installed');
                })
                .catch(err => {
                    View.hide('checking');
                    View.show('not-installed');
                    View.showStatus(err);
                })
        })
        .catch(err => {
            View.hide('checking');
            View.show('not-installed');
            View.showStatus(err);
        })
}

checkInstallation();


