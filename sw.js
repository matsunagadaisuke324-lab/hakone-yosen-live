const CACHE_NAME = "hakone-yosen-live-v1";

const CACHE_FILES = [
    "./",
    "./index.html",
    "./manifest.webmanifest"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_FILES);
            })
    );

    self.skipWaiting();
});


self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys()
            .then(keys => {

                return Promise.all(
                    keys.map(key => {

                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }

                    })
                );

            })
    );

    self.clients.claim();
});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                if (response) {
                    return response;
                }

                return fetch(event.request);

            })

    );

});