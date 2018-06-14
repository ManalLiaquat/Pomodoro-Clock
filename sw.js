const cacheName = 'RapydSell-App';
const staticAssets = [
    './',
    './css/style.css',
    './js/app.js',
    './img/favicon.png',
    './img/bg.jpg',
]

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install');
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(staticAssets);
        })
    );
})

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}