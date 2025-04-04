

var staticCacheName = "django-pwa-v" + new Date().getTime();
var filesToCache = [

    '/history/',
    '/personajes/',
    '/mecanicas/', 
    '/contact/',
    '/offline/',
    '//',
    '/static/inicio/css/fontawesome-all.min.css',
    '/static/inicio/css/main.css',
    '/static/inicio/css/noscript.css',
    '/static/inicio/webfonts/n.otf',
    '/static/inicio/webfonts/font.ttf',
    '/static/inicio/images/logo.jpg',
    "/manifest.json",
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("django-pwa-")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener("fetch", function(event){
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
        .then(function(result){
            return caches.open(staticCacheName)
            .then(function(cache){
                cache.put(event.request.url, result.clone())
                    .catch(err => {
                        // Error al guardar en caché (probablemente un opaque response)
                        console.warn('No se pudo almacenar en caché:', event.request.url, err);
                    });
                return result;
            });
        })
        .catch(function(){
            return caches.match(event.request)
                .then(response => response || caches.match('/offline/'));
        })
    );
});
