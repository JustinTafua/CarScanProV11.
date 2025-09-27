// public/sw.js — minimal service worker to satisfy installability
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  })());
  self.clients.claim();
});
self.addEventListener('fetch', () => {});
