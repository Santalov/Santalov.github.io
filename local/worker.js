const origin = 'http://localhost:9001/local';

const methodName = origin + '/checkout';
const checkoutUrl = origin + '/checkout';

let resolver;
let paymentRequestEvent;

// открывает окно и сохраняет данные запроса
self.addEventListener('paymentrequest', evt => {
    paymentRequestEvent = evt;

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

self.addEventListener('message', evt => {
    // обмен сообщениями с внешним миром
    console.log('Message in service worker:', evt);
    // это условие соответствует техническому сообщению (служит для синхронизации), полученному из диалога payments api
    if (evt.data === 'payment_app_window_ready') {
        // посылка внутрь диалога данных, полученных ранее при обработке paymentsrequest
        sendPaymentRequest(evt);
        return
    }
    // это условие соответствует техническому сообщению (служит для синхронизации), полученному из основной страницы (http://localhost/demo)
    if (evt.data === 'installer_page_ready_for_interaction') {
        // отправка ответа на это сообщение (ответ видет на http://localhost/demo)
        evt.source.postMessage(evt.data);
        return;
    }
    // это условие соответствует полезному сообщению из диалога
    if (evt.data.methodName) {
        if (evt.data.methodName === methodName) {
            // закрытие диалога и возвращение наружу (в http://localhost/demo) сообщения
            resolver.resolve(evt.data);
        } else {
            resolver.reject(evt.data);
        }
    } else {
        // если попали сюда, значит это полезно сообщение, отправленное из http://localhost/demo
        evt.source.postMessage(evt.data);
    }
});

const sendPaymentRequest = (evt) => {
    if (!paymentRequestEvent) {
        console.error('No payment request window');
        return;
    }
    // это идет отправка сообщения внутрь диалога. Сообщение хранится в methodData[0].data.data в виде строки
    evt.source.postMessage(paymentRequestEvent.methodData);
};

const CACHE_NAME = 'checkout-cache-v1';
const urlsToCache = [
    'checkout/',
    'checkout/checkout.js',
];

self.addEventListener('install', evt => {
    evt
        .waitUntil(
            caches
                .delete(CACHE_NAME)
                .then(() => {
                    caches
                        .open(CACHE_NAME)
                        .then(function (cache) {
                            console.log('Opened cache');
                            return cache.addAll(urlsToCache);
                        })
                })
        );
});

self.addEventListener('fetch', evt => {
    console.log('fetch', evt.request);
    evt
        .respondWith(
            caches
                .match(evt.request)
                .then(response => {
                        if (response) {
                            console.log('from cache', evt.request);
                            return response;
                        }
                        console.log('fetching', evt.request);
                        return fetch(evt.request);
                    }
                )
        );
});
