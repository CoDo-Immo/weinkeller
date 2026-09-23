// Service Worker – macht die App installierbar und offline-startfähig.
const CACHE = "warenvorrat-v11";
const ASSETS = [
  "./", "./index.html", "./manifest.json",
  "./icon.svg", "./icon-192.png", "./icon-512.png",
  "./apple-touch-icon.png", "./favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Supabase-Daten immer live aus dem Netz holen (nie aus dem Cache)
  if (url.hostname.endsWith("supabase.co")) return;

  const isHTML = req.mode === "navigate"
    || url.pathname.endsWith("/")
    || url.pathname.endsWith("index.html");

  if (isHTML) {
    // App-Seite: erst Netz (damit Updates ankommen), sonst Cache
    e.respondWith(
      fetch(req)
        .then(resp => { const c = resp.clone(); caches.open(CACHE).then(x => x.put(req, c)); return resp; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
  } else {
    // Icons, Manifest, Bibliothek: erst Cache, sonst Netz
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(resp => {
        if (resp && resp.status === 200) { const c = resp.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
        return resp;
      }).catch(() => cached))
    );
  }
});
