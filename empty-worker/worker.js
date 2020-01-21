self.resolver = null;

self.addEventListener('message', function (event) {
    console.log('message event', event);
    if (event.data && self.resolver) {
        self.resolver({
            methodName: 'https://santalov.github.io/empty-worker/',
            details: event.data,
        });
    } else {
        console.error('service worker received empty data', event);
    }
});

self.addEventListener('paymentrequest', (evt) => {
    console.log(evt);
    evt.respondWith(new Promise((resolve) => {
        console.log('resolve', resolve);
        self.resolver = resolve;
        evt.openWindow('form.html');
    }));
});