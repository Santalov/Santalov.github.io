async function saveTest() {
    try {
        const request = new PaymentRequest([{
            supportedMethods: 'https://santalov.github.io/form.html',
            data: {
                data: 'iziTestMessage',
            },
        }], {
            total: {
                label: 'N/A',
                amount: {
                    currency: 'USD',
                    value: '0.00'
                }
            }
        });
        const response = await request.show();
        document.getElementById('status').innerHTML = 'Username and password stored.';
        await response.complete('success');
    } catch (e) {
        document.getElementById('status').innerHTML = e.toString() + 'Error.';
    }
}

async function getTest() {
    try {
        document.getElementById('status').innerHTML = 'Getting data';
        const request = new PaymentRequest([{
            supportedMethods: 'https://santalov.github.io/form.html',
            data: {
                data: 'nodata',
            },
        }], {
            total: {
                label: 'N/A',
                amount: {
                    currency: 'USD',
                    value: '0.00'
                }
            }
        });
        const response = await request.show();
        if (response.details.data) {
            document.getElementById('data').innerText = response.details.data;
        }
        await response.complete('success');
    } catch (e) {
        document.getElementById('status').innerHTML = e.toString() + 'Error.';
    }
}