const origin = 'https://santalov.github.io/emscripten-demo';
const checkoutUrl = origin + '/checkout';

let resolver;

// открывает окно и сохраняет данные запроса
self.addEventListener('paymentrequest', evt => {
    evt
        .respondWith(new Promise((resolve, reject) => {
            resolver = {
                resolve: resolve,
                reject: reject,
            };
            evt
                .openWindow(checkoutUrl)
                .then(client => {
                    if (client === null) {
                        resolver.reject('Failed to open window');
                    }
                })
                .catch(err => {
                    resolver.reject(err);
                });
        }))
});