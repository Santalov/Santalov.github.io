function openWindow() {
    try {
        View.paymentsStatus().innerText = 'Открытие диалога';
        const request = new PaymentRequest([{
            supportedMethods: window.location.href + 'checkout',
            data: {
                data: 'test msg'
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
        request
            .show()
            .catch(err => {
                console.error(err);
                View.paymentsStatus().innerText = err;
            });
    } catch (e) {
        console.error(e);
        View.paymentsStatus.innerText = e;
    }
}
