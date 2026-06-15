/* 競馬予想PWA Service Worker
   バージョンを上げる(=CACHEを変える)と、次回オンライン時に更新が反映されます。 */
const CACHE = 'keiba-yosou-v9';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './2026-06-14_takarazuka/prediction.html',
  './2026-06-14_takarazuka/odds.html',
  './2026-06-14_takarazuka/research.html',
  './2026-06-14_takarazuka/style.css',
  './2026-06-14_takarazuka/analysis/1_展開予想.html',
  './2026-06-14_takarazuka/analysis/2_血統.html',
  './2026-06-14_takarazuka/analysis/3_近走成績.html',
  './2026-06-14_takarazuka/analysis/4_馬場適性.html',
  './2026-06-14_takarazuka/analysis/5_オッズ分析.html'
];

// インストール: アプリシェルを事前キャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// 有効化: 古いキャッシュを掃除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 取得: キャッシュ優先 → なければネット取得して動的キャッシュ（オフライン閲覧）
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
