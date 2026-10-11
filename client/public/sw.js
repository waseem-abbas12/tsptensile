// TSP Tensile Structures Pakistan — Progressive Web App Service Worker
const CACHE_NAME = "tsp-tensile-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/favicon.svg",
  "/favicon-192x192.png",
  "/favicon-512x512.png",
  "/apple-touch-icon.png",
  "/images/hero.jpg",
  "/images/commercial.jpg",
  "/images/walkway.jpg",
  "/images/detail.jpg"
];

// Install: Precache shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("Some PWA assets failed to precache:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network first for HTML/API, Cache first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin or non-GET requests
  if (request.method !== "GET" || !url.origin.includes(self.location.origin)) {
    return;
  }

  // API calls: Network first, no fallback cache for admin/dynamic write
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // HTML Navigation: Network first, fallback to cached index.html
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match("/index.html") || caches.match("/"))
    );
    return;
  }

  // Static assets (images, css, js): Stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
