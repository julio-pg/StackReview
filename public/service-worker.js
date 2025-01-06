const CACHE_NAME = 'stackReview-pwa-v1';
const urlsToCache = [
  '/',
  '/build/*',
  // Add other assets you want to cache
  '/styles.css',
  '/icons/stackReviewLogo192px.png',
  '/icons/stackReviewLogo512px.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
}); 