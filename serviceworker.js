var CACHE_TITLE = 'my-site-cache';
var CACHE_VERSION = 'v1';
var CACHE_NAME = CACHE_TITLE + '-' + CACHE_VERSION;
var urlsToCache = [
  '/',
  '/style.css',
  '/start.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
	  event.respondWith(
		caches.match(event.request)
		  .then(function(response) {
			// Cache hit - return response
			if (response) {
			  console.log('loaded from cache');
			  return response;
			}
			return fetch(event.request);
		  }
		)
	  );
});