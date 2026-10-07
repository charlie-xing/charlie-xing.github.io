// Kill switch for the service worker left behind by the old Jekyll blog.
// Browsers that still have it installed fetch this file on their next visit,
// install it, and it then wipes the old caches (including the cached
// "Offline" page) and unregisters itself. Keep this file until old visitors
// have had time to come back.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
