self.resolver = null;

self.addEventListener('message', function (event) {
    console.log('message event', event);
    if (event.data) {
        event.data.resolver('ok');
    } else {
        console.error('service worker received empty data', event);
    }
});

self.addEventListener('paymentrequest', (evt) => {
    console.log(evt);
    evt.respondWith(new Promise((resolve) => {
        console.log('resolve', resolve);
        evt.openWindow('form.html');
    }));
});