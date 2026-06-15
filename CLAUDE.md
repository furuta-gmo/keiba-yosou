# 競馬予想PWAサイト — Claude用 更新手順書

このリポジトリは GitHub Pages で公開している競馬予想PWA（スマホでホーム画面追加・オフライン可）。
**スマホ/PCのどこからでも、Claudeがこの手順に従って予想を更新→pushすれば、スマホアプリに自動反映される。**

公開URL: https://furuta-gmo.github.io/keiba-yosou/

## 方針（不変）
- **回収率重視・期待値型**。EV = 想定勝率 × 単勝オッズ。EV>1.0 が買い、妙味（人気と能力のズレ）を狙う。
- 圧倒的人気馬の**単勝は買わない**（過剰人気）。複勝率が高ければ連系の「軸」としてのみ使う。
- 買い目は**100円単位**、合計は予算ちょうど（既定10,000円）。
- **回収床**：主要ペアが1-2着なら馬連＋ワイドで概ね予算以上を返す設計。3連複は妙味・上振れ用。
- **直前の馬場急変は最優先で反映**：稍重〜重なら重巧者（例: ゴールドシップ産駒＝メイショウタバル型）を格上げ、良馬場巧者・切れ味型を割引。

## ファイル構造
```
/ (リポジトリ＝GitHub Pages公開ルート)
├── index.html              トップ（レース一覧・計算機入口）
├── sw.js                   Service Worker（オフライン用。CACHE版とASSETS一覧）
├── manifest.webmanifest    PWA定義
├── icon-180/192/512.png    アイコン
├── style.css               共有デザイン（色/レイアウトはここ1ファイル）
└── 2026-06-14_takarazuka/  レースごとのフォルダ（romaji名）
    ├── prediction.html     最終予想（メイン）← 通常ここを編集
    ├── research.html       情報まとめ
    ├── odds.html           オッズ計算機（BASE配列に想定勝率と既定オッズ）
    ├── style.css           （ルートのコピー）
    └── analysis/1..5_*.html 5視点分析
```

## 更新の鉄則（必ず守る）
1. 予想本体は `2026-06-14_takarazuka/prediction.html` を編集（新レースは新フォルダを作り index.html に行を追加）。
2. **必ず `sw.js` の `CACHE` バージョンを上げる**（例 `keiba-yosou-v9` → `v10`）。これを忘れるとスマホで古い表示が残る。新規ファイルは `sw.js` の `ASSETS` にパスを追記。
3. 各HTMLの `<head>` には PWAスニペット（theme-color / apple-mobile-web-app-* / `<link rel="manifest" href="../manifest.webmanifest">` / apple-touch-icon / `navigator.serviceWorker.register('../sw.js')`）が必要。レース直下は `../`、analysis配下は `../../`、ルートは相対なし。新規ページには必ず付与。
4. 文字コードは UTF-8（BOMなし）。
5. 編集後: `git add -A && git commit -m "..." && git push`。GitHub Pagesが自動再ビルド（~1分）→スマホ反映。
6. バージョン表記（prediction.htmlの `vN`、index.htmlの「最終予想 vN」）も更新。

## 最新情報を渡されたときの動き方
- **オッズ更新**：`odds.html` の BASE配列の既定オッズも最新に更新。prediction.html の期待値表・買い目を再計算（EV=想定勝率×単勝）。妙味馬を相手に厚く、回収床を維持。
- **馬体重/追い切り/枠**：該当馬の評価を上げ下げし、prediction.html とresearch.html に反映。
- **馬場急変（最優先）**：稍重以上なら重巧者を◎/○へ格上げ、良馬場前提の馬を割引。買い目の比重を即組み替え。
- 想定勝率モデルの目安は `2026-06-14_takarazuka/odds.html` の BASE配列（p=想定勝率%）。

## 速い更新の依頼テンプレ（ユーザーがこれを貼る想定）
```
【更新依頼】レース: 宝塚記念2026
種類: [オッズ / 馬体重 / 馬場 / 結果 / その他]
内容: （例）レース直前にゲリラ豪雨で良→重に変化。最新単勝: 5=1.5, 16=7.8 ...
希望: 予想を更新してpushして
```
このテンプレを受け取ったら、上記「更新の鉄則」に従って編集→push まで一気に実行する。
