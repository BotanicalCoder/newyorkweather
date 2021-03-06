const staticWeatherApp = "Weather-update-site-v1";
const assets = ["/", "/index.html", "/index.css", "/index.js" ];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticWeatherApp).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
