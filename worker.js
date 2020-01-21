self.addEventListener('install', function (e) {
    console.log('install ev', e);
});

self.addEventListener('fetch', function (ev) {
    console.log('fetch event', ev);
});

self.addEventListener('activate', function (ev) {
    console.log('activate ev', ev);
});