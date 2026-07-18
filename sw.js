/* 競馬予想PWA Service Worker
   バージョンを上げる(=CACHEを変える)と、次回オンライン時に更新が反映されます。 */
const CACHE = 'keiba-yosou-v95';

const ASSETS = [
  './',
  './index.html',
  './track.html',
  './bet.html',
  './score.html',
  './autumn-watch.html',
  './natsu-juusho.html',
  './2026-07-01_teio-sho/prediction.html',
  './2026-07-01_teio-sho/odds.html',
  './2026-07-01_teio-sho/research.html',
  './2026-07-01_teio-sho/style.css',
  './2026-07-01_teio-sho/analysis/1_展開予想.html',
  './2026-07-01_teio-sho/analysis/2_血統.html',
  './2026-07-01_teio-sho/analysis/3_近走成績.html',
  './2026-07-01_teio-sho/analysis/4_コース馬場.html',
  './2026-07-01_teio-sho/analysis/5_オッズ分析.html',
  './2026-07-01_teio-sho/analysis/6_調教.html',
  './2026-07-01_teio-sho/analysis/7_指数.html',
  './2026-07-01_teio-sho/analysis/8_データ傾向.html',
  './2026-07-01_teio-sho/analysis/9_騎手.html',
  './2026-07-01_teio-sho/analysis/10_当日.html',
  './2026-07-05_kitakyushu-kinen/prediction.html',
  './2026-07-05_kitakyushu-kinen/odds.html',
  './2026-07-05_kitakyushu-kinen/research.html',
  './2026-07-05_kitakyushu-kinen/style.css',
  './2026-07-05_kitakyushu-kinen/analysis/1_展開予想.html',
  './2026-07-05_kitakyushu-kinen/analysis/2_血統.html',
  './2026-07-05_kitakyushu-kinen/analysis/3_近走成績.html',
  './2026-07-05_kitakyushu-kinen/analysis/4_コース馬場.html',
  './2026-07-05_kitakyushu-kinen/analysis/5_オッズ分析.html',
  './2026-07-05_kitakyushu-kinen/analysis/6_調教.html',
  './2026-07-05_kitakyushu-kinen/analysis/7_指数.html',
  './2026-07-05_kitakyushu-kinen/analysis/8_データ傾向.html',
  './2026-07-05_kitakyushu-kinen/analysis/9_騎手.html',
  './2026-07-05_kitakyushu-kinen/analysis/10_当日.html',
  './2026-07-19_hakodate-2yo/prediction.html',
  './2026-07-19_hakodate-2yo/odds.html',
  './2026-07-19_hakodate-2yo/research.html',
  './2026-07-19_hakodate-2yo/style.css',
  './2026-07-19_hakodate-2yo/analysis/1_展開予想.html',
  './2026-07-19_hakodate-2yo/analysis/2_血統.html',
  './2026-07-19_hakodate-2yo/analysis/3_近走成績.html',
  './2026-07-19_hakodate-2yo/analysis/4_コース馬場.html',
  './2026-07-19_hakodate-2yo/analysis/5_オッズ分析.html',
  './2026-07-19_hakodate-2yo/analysis/6_調教.html',
  './2026-07-19_hakodate-2yo/analysis/7_指数.html',
  './2026-07-19_hakodate-2yo/analysis/8_データ傾向.html',
  './2026-07-19_hakodate-2yo/analysis/9_騎手.html',
  './2026-07-19_hakodate-2yo/analysis/10_当日.html',
  './2026-07-19_kokura-kinen/prediction.html',
  './2026-07-19_kokura-kinen/odds.html',
  './2026-07-19_kokura-kinen/research.html',
  './2026-07-19_kokura-kinen/style.css',
  './2026-07-19_kokura-kinen/analysis/1_展開予想.html',
  './2026-07-19_kokura-kinen/analysis/2_血統.html',
  './2026-07-19_kokura-kinen/analysis/3_近走成績.html',
  './2026-07-19_kokura-kinen/analysis/4_コース馬場.html',
  './2026-07-19_kokura-kinen/analysis/5_オッズ分析.html',
  './2026-07-19_kokura-kinen/analysis/6_調教.html',
  './2026-07-19_kokura-kinen/analysis/7_指数.html',
  './2026-07-19_kokura-kinen/analysis/8_データ傾向.html',
  './2026-07-19_kokura-kinen/analysis/9_騎手.html',
  './2026-07-19_kokura-kinen/analysis/10_当日.html',
  './2026-07-12_tanabata-sho/prediction.html',
  './2026-07-12_tanabata-sho/odds.html',
  './2026-07-12_tanabata-sho/research.html',
  './2026-07-12_tanabata-sho/style.css',
  './2026-07-12_tanabata-sho/analysis/1_展開予想.html',
  './2026-07-12_tanabata-sho/analysis/2_血統.html',
  './2026-07-12_tanabata-sho/analysis/3_近走成績.html',
  './2026-07-12_tanabata-sho/analysis/4_コース馬場.html',
  './2026-07-12_tanabata-sho/analysis/5_オッズ分析.html',
  './2026-07-12_tanabata-sho/analysis/6_調教.html',
  './2026-07-12_tanabata-sho/analysis/7_指数.html',
  './2026-07-12_tanabata-sho/analysis/8_データ傾向.html',
  './2026-07-12_tanabata-sho/analysis/9_騎手.html',
  './2026-07-12_tanabata-sho/analysis/10_当日.html',
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
  './2026-06-21_shirasagi/analysis/10_当日.html',
  './2026-06-28_hakodate-kinen/prediction.html',
  './2026-06-28_hakodate-kinen/research.html',
  './2026-06-28_hakodate-kinen/odds.html',
  './2026-06-28_hakodate-kinen/style.css',
  './2026-06-28_hakodate-kinen/analysis/1_展開予想.html',
  './2026-06-28_hakodate-kinen/analysis/2_血統.html',
  './2026-06-28_hakodate-kinen/analysis/3_近走成績.html',
  './2026-06-28_hakodate-kinen/analysis/4_コース馬場.html',
  './2026-06-28_hakodate-kinen/analysis/5_オッズ分析.html',
  './2026-06-28_hakodate-kinen/analysis/6_調教.html',
  './2026-06-28_hakodate-kinen/analysis/7_指数.html',
  './2026-06-28_hakodate-kinen/analysis/8_データ傾向.html',
  './2026-06-28_hakodate-kinen/analysis/9_枠順バイアス.html',
  './2026-06-28_hakodate-kinen/analysis/10_当日.html',
  './2026-06-28_radio-nikkei/prediction.html',
  './2026-06-28_radio-nikkei/research.html',
  './2026-06-28_radio-nikkei/odds.html',
  './2026-06-28_radio-nikkei/style.css',
  './2026-06-28_radio-nikkei/analysis/1_展開予想.html',
  './2026-06-28_radio-nikkei/analysis/2_血統.html',
  './2026-06-28_radio-nikkei/analysis/3_近走成績.html',
  './2026-06-28_radio-nikkei/analysis/4_コース馬場.html',
  './2026-06-28_radio-nikkei/analysis/5_オッズ分析.html',
  './2026-06-28_radio-nikkei/analysis/6_調教.html',
  './2026-06-28_radio-nikkei/analysis/7_指数.html',
  './2026-06-28_radio-nikkei/analysis/8_データ傾向.html',
  './2026-06-28_radio-nikkei/analysis/9_枠順バイアス.html',
  './2026-06-28_radio-nikkei/analysis/10_当日.html'
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

// 取得:
//  ・HTML/ページ遷移 = ネット優先（オンライン時は常に最新を取得しキャッシュも更新／オフライン時のみキャッシュ）
//    → これで「古い予想がスマホに残る」問題を解消（旧キャッシュ優先方式の弱点を修正）
//  ・CSS/JS/画像 = キャッシュ優先＋動的キャッシュ（オフライン閲覧・高速表示）
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const req = e.request;
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req, { cache: 'no-store' }).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
