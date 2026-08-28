# 移行前スナップショット — keiba-yosou (horse-racing-site)

- 取得日時: 2026-08-28（JST）
- 目的: ローカルPCへの移行後の**受入基準（acceptance criteria）**。移行後にこの値・状態を再現できれば移行成功とみなす。
- 対象リポジトリ: `C:\Users\usr0106871\horse-racing-site`
- 公開URL: https://furuta-gmo.github.io/keiba-yosou/ （GitHub Pages / `main` から配信）
- 種別: **静的サイト（ビルド不要・npm依存なし・バックエンドなし）**

---

## 1. git 状態（移行後にそのまま一致すべき）

| 項目 | 値 |
|---|---|
| HEAD | `6e53610e78bd0b5c519e9ff56a8a15a0778d247c` (short `6e53610`) |
| ブランチ | `main`（`origin/main` を追跡） |
| HEADコミット日時 | 2026-08-14 13:50:06 +0900 |
| HEADコミットメッセージ | 当日海外→自動化=Stage E結果集計をdurable一発cron(8/16)に載せる |
| tags | **なし**（タグ運用していない） |
| working tree | **clean**（`git status --porcelain` 空・未コミット変更なし） |
| 未追跡ファイル | なし |
| 無視ファイル（`!!`） | なし |
| remote origin | `https://github.com/furuta-gmo/keiba-yosou.git` (fetch/push 同一) |
| 追跡ファイル数 | 219 |
| analysis 配下ページ数 | 135 |

**受入チェック**: 移行後 `git rev-parse HEAD` が上記と一致し、`git status` が clean であること。

---

## 2. 主要な表示数値（このアプリの代表指標）

このアプリの「代表指標」は **forward-test 一本化台帳（`track.html` の `#ftledger`）** が LG 配列から**クライアント側JSで算出**して表示する KPI。データは HTML に内蔵（外部DB・APIなし）。移行後に `track.html` を開けば同値が再現される。

### 2-1. 台帳サマリー KPI（n=11・2026-08-28時点）

`node` で `track.html` と同一ロジックを再現した確定値：

| KPI | 値 |
|---|---|
| 登録レース数 n | **11** |
| ◎的中 | 1/11 |
| self / mkt LL平均 | **2.74 / 2.48**（差 +0.26＝self が市場に僅差で劣後） |
| 較正が市場以上（self p ≥ 市場 p） | 5/11 |
| 軸A：安い切り捨て（cut） | 4/11（36%） |
| 軸B：読み○でも回収失敗（moneyMiss） | 3/11 |
| kill/go k1（LL差 ≤ 0） | +0.26 → **未達** |
| kill/go k2（cut率 ≤ 20%） | 36% → **未達** |
| 先行指標(a) ゲート保持率 | 5/9（56%） |
| 先行指標(b) 構築準拠率 | 3/5（60%） |
| (a)/(b) 遡及未確定 | 2 / 6 |

算出式（`track.html` 内）：`mkt=(1/wOdds)/orr` ／ `selfLL=-ln(max(1e-4,selfPW))` ／ `mktLL=-ln(max(1e-4,mkt))`。

### 2-2. 台帳の登録11レース（LG 配列・`track.html` L289〜301）

6/28 函館記念 / 6/28 ラジオNIKKEI / 7/1 帝王賞 / 7/5 北九州記念 / 7/12 七夕賞 / 7/19 小倉記念 / 7/19 函館2歳S / 7/20 マーキュリーC / 7/26 関屋記念 / 7/26 東海S / 8/9 CBC賞。

> **注意（既知の未完了・移行とは無関係）**: 8/16 中京記念・札幌記念は Stage C（committed self-p）まで push 済みだが、**Stage E 結果集計が未反映＝台帳に未登録（n は 11 のまま）**。移行後に別途 Stage E を実施して n=13 にする作業が残っている（移行の受入とは切り離す）。

### 2-3. その他の表示バージョン・定数

| 表示 | 値 | 場所 |
|---|---|---|
| Service Worker CACHE | `keiba-yosou-v118` | `sw.js` L3 |
| index バージョンバッジ | `sw v118 ｜ 更新 2026-08-14` | `index.html` L36 |
| index レースカード行数 | 24 | `index.html` |
| 勝負EV閾値 | 1.25（既定） | `bet.html` / CLAUDE.md §10 |
| サイジング既定 | λ=0.5・w=0.4 | `bet.html` |
| softmax β | 0.90（既定） | `score.html` / CLAUDE.md §12 |

---

## 3. データ元ファイルのパス（＝データはすべてリポジトリ内・HTML内蔵）

このアプリは**外部データファイルを持たない**。全データはHTMLソースに直書き：

| データ | 保持場所 |
|---|---|
| forward-test 台帳（代表指標の源泉） | `track.html` 内 `LG` 配列（L289〜301） |
| 各レースの想定勝率 p・既定オッズ | 各 `<race>/odds.html` 内 `BASE` 配列 |
| レース一覧・カード | `index.html` `.race-list` |
| 運用ドクトリン（方針・§9〜14ルール） | `CLAUDE.md`（リポジトリ内） |
| デザイン | `style.css`（ルート1本＋各フォルダにコピー） |
| PWA定義・SWキャッシュ一覧 | `manifest.webmanifest` / `sw.js` の `ASSETS` |

**移行後に注意すべきデータ非移行項目（重要）**:
- **ユーザーがブラウザで入力したオッズは `localStorage` に端末ローカル保存され、リポジトリにもgitにも入らない＝移行しない。** キー一覧（16件）:
  `takarazuka2026-odds-v2`, `fuchu-himba-2026-odds-v6`, `shirasagi-2026-odds-v6`, `hakodate-2026-odds-v3`, `radio-nikkei-2026-odds-v3`, `teio-sho-2026-odds-v3`, `kitakyushu-kinen-2026-odds-v5`, `tanabata-sho-2026-odds-v5`, `hakodate-2yo-2026-odds-v4`, `kokura-kinen-2026-odds-v3`, `mercury-cup-2026-odds-v4`, `sekiya-kinen-2026-odds-v1`, `tokai-s-2026-odds-v1`, `cbc-sho-2026-odds-v08`, `chukyo-kinen-2026-odds-v2c`, `sapporo-kinen-2026-odds-v2c`。
  → 台帳KPI（§2）はソース内蔵の `LG` 由来なので端末非依存で再現するが、各 odds.html の「貼り付け反映したオッズ」は移行先で再入力が必要（＝仕様・データ喪失ではない）。

---

## 4. gitignore されている設定・秘密ファイルの有無

- **`.gitignore` は存在しない。** 無視ファイル・未追跡ファイルともにゼロ（§1）。
- **リポジトリ内に秘密情報・APIキー・トークン・設定ファイルは無い。** 静的公開サイトのため認証情報を持たない。
- push に使う GitHub 認証は **`gh` CLI（外部・下記§5）が別管理**（リポジトリ外）。

**受入チェック**: 移行先でも秘密ファイルの持ち込みは不要。認証は §5 の gh 再ログインのみ。

---

## 5. リポジトリ外に依存しているもの（移行先で別途用意が必要）

| 種別 | 依存物 | 現状 | 移行先での対応 |
|---|---|---|---|
| ランタイム | Node.js | `v24.16.0`（npm 11.13.0） | HTML検証（`node --check sw.js` / `node -e`）に使用。同等版を用意 |
| git | git | `2.54.0.windows.1` | 用意 |
| デプロイ/認証 | GitHub CLI `gh` | `C:\Program Files\GitHub CLI\gh.exe` ver 2.93.0・**furuta-gmo で認証済**（トークンはgh管理＝リポジトリ外） | 移行先で `gh auth login`（furuta-gmo）再認証 |
| ホスティング | GitHub Pages + repo `furuta-gmo/keiba-yosou`（Public） | `main` から自動配信 | 変更なし（同一リモートを push） |
| スケジューラ | `~/.claude/scheduled_tasks.json` | 現在 **`{"tasks": []}` ＝登録タスクなし**（8/16 の一発cron e7c6e61c は発火/消化済で残っていない） | 移行先で自動発火が必要なら再登録。**このcronはClaude Code REPL稼働時のみ発火＝クラウド無人保証なし**（既知の限界） |
| スラッシュコマンド | `~/.claude/commands/` | `cockpit-update.md` のみ存在（**別プロジェクト=CFO cockpit用**）。**本レース予想プロジェクト専用のスラッシュコマンドは無い** | 移行不要（本アプリは非依存） |
| 運用メモリ | `~/.claude/projects/.../memory/project_horse_racing.md` | 運用の一部（発火運用・台帳整合ルール等）が**リポジトリ外のメモリに存在** | 移行先のメモリにも引き継ぎ推奨。ただし方針の正本は repo 内 `CLAUDE.md` |

**npm 依存・`package.json`・`node_modules`・`LICENSE` は無し**（静的サイト）。Node は検証用途のみで、サイト実行には不要。

---

## 6. 移行後の受入基準（このスナップショットの使い方）

1. `git clone` 後 `git rev-parse HEAD` = `6e53610…247c`、`git status` = clean（§1）。
2. `track.html` をブラウザで開き、KPI が §2-1 の値（n=11・self/mkt 2.74/2.48・cut 4/11 等）を再現。
3. `sw.js` の CACHE = `keiba-yosou-v118`、index バッジ = `sw v118`（§2-3）。
4. `node --check sw.js` が通る（Node 用意できていること）。
5. `gh auth status` が furuta-gmo で通り、`git push` で GitHub Pages に反映できる（§5）。
6. 端末ローカルの localStorage オッズは移行しない前提（§3）＝再入力で正常。
7. 残タスク（移行とは独立）: 8/16 中京記念・札幌記念の Stage E を実施し台帳を n=13 に更新。

---

*本ファイルは移行前の観測記録であり、アプリのコードは一切変更していない。*
