/* 競馬予想PWA Service Worker
   バージョンを上げる(=CACHEを変える)と、次回オンライン時に更新が反映されます。 */
const CACHE = 'keiba-yosou-v25';

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
  './2026-06-14_takarazuka/analysis/5_オッズ分析.html',
  './2026-06-21_fuchu-himba/prediction.html',
  './2026-06-21_fuchu-himba/research.html',
  './2026-06-21_fuchu-himba/odds.html',
  './2026-06-21_fuchu-himba/style.css',
  './2026-06-21_fuchu-himba/analysis/1_展開予想.html',
  './2026-06-21_fuchu-himba/analysis/2_血統.html',
  './2026-06-21_fuchu-himba/analysis/3_近走成績.html',
  './2026-06-21_fuchu-himba/analysis/4_コース馬場.html',
  './2026-06-21_fuchu-himba/analysis/5_オッズ分析.html',
  './2026-06-21_fuchu-himba/analysis/6_調教.html',
  './2026-06-21_fuchu-himba/analysis/7_指数.html',
  './2026-06-21_fuchu-himba/analysis/8_データ傾向.html',
  './2026-06-21_fuchu-himba/analysis/9_枠順バイアス.html',
  './2026-06-21_fuchu-himba/analysis/10_当日.html',
  './2026-06-21_shirasagi/prediction.html',
  './2026-06-21_shirasagi/research.html',
  './2026-06-21_shirasagi/odds.html',
  './2026-06-21_shirasagi/style.css',
  './2026-06-21_shirasagi/analysis/1_展開予想.html',
  './2026-06-21_shirasagi/analysis/2_血統.html',
  './2026-06-21_shirasagi/analysis/3_近走成績.html',
  './2026-06-21_shirasagi/analysis/4_コース馬場.html',
  './2026-06-21_shirasagi/analysis/5_オッズ分析.html',
  './2026-06-21_shirasagi/analysis/6_調教.html',
  './2026-06-21_shirasagi/analysis/7_指数.html',
  './2026-06-21_shirasagi/analysis/8_データ傾向.html',
  './2026-06-21_shirasagi/analysis/9_枠順バイアス.html',
  './2026-06-21_shirasagi/analysis/10_当日.html'
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
