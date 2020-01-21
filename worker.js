
self.resolver = null;

self.addEventListener('message', (evt) => {
    console.log(evt);
    console.log(evt.data);
    if (evt.data && self.resolver !== null) {
        self.resolver({
            methodName: 'https://santalov.github.io/form.html',
            details: evt.data
        });
        self.resolver = null;
    }
});

self.addEventListener('paymentrequest', (evt) => {
    console.log(evt);
    evt.respondWith(new Promise((resolve) => {
        console.log(resolve);
        self.resolver = resolve;
        evt.openWindow('form.html#' + 'set#' + evt.data.data);
    }));
});