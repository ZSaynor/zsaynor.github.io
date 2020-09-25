var CACHE_TITLE = 'CookingAssistant-Cache';
var CACHE_VERSION = 'v7';
var CACHE_NAME = CACHE_TITLE + '-' + CACHE_VERSION;
var urlsToCache = [
  '/index.html',
  '/list.html',
  '/incomplete.html',
  '/recipes/donut.html',
  '/recipes/pizza.html',
  '/recipes/spagbol.html',
  '/recipes/steak.html',
  '/recipes/tacos.html',
  '/css/style.css',
  '/js/javascript.js',
  '/manifest.json',
  '/img/logo.png',
  '/img/back.png',
  '/img/list.png',
  '/img/favourites.png',
  '/img/nonfavourite.png',
  '/img/ingredients.png',
  '/img/settings.png',
  '/img/donut.jpg',
  '/img/pizza.jpg',
  '/img/spaghettiBolognese.jpg',
  '/img/steak.jpg',
  '/img/tacos.jpg'
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