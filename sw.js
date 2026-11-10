// 离线缓存：页面“先网络、失败用缓存”；照片、字体等静态文件“先缓存、再网络”。
// 不缓存天气请求（跨域）；天气结果由页面自己存在 localStorage。用户记录不经过这里。
const CACHE = 'kunming-birds-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/apple-touch-icon.png',
  './fonts/lxgwwenkaigbscreen/result.min.css', './fonts/lxgwwenkaimonogbscreen/result.min.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))));
    return;
  }
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
