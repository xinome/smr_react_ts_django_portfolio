# プロジェクト名

## ファイル構造

### バックエンド(backend_django)

- my_django_project/
  - プロジェクト全体の設定やルートURL管理を担当します。
- django_app/
  - API実装・DB設計など業務ロジックをまとめたアプリケーション層です。
- models.py / views.py / serializers.py
  - Django REST Framework構成で、データ操作〜APIレスポンスまでを実装しています。
- migrations/
  - DBテーブル構造変更履歴を保持します（自動生成）。

```
backend_django/
├── my_django_project/   # プロジェクト設定・全体ルーティング
│   ├── settings.py      # 環境設定（DB、INSTALLED_APPSなど）
│   ├── urls.py          # プロジェクト全体のURLルーティング
│   ├── wsgi.py          # WSGIサーバー起動用
│   ├── asgi.py          # ASGIサーバー起動用（任意）
│   ├── main.py          # プロジェクトエントリーポイント（任意）
│   └── __init__.py
│
├── django_app/          # アプリケーション本体（機能・API実装）
│   ├── models.py        # DBモデル定義
│   ├── serializers.py   # シリアライザー（JSON変換）
│   ├── views.py         # APIのメイン処理
│   ├── urls.py          # アプリ単位のルーティング
│   ├── admin.py         # 管理画面へのモデル登録
│   ├── apps.py          # アプリ設定
│   ├── migrations/      # DBマイグレーション履歴
│   └── tests.py         # 単体テスト
│
├── manage.py            # Django管理コマンド用スクリプト
├── requirements.txt     # 必要パッケージ一覧
└── Dockerfile           # Dockerビルド用ファイル
```




### フロントエンド(frontend_react)

- public/
  - ReactのベースHTMLやfaviconなどの静的ファイルを管理
- src/components/
  - HeaderやSideMenuなど再利用可能なUI部品を格納
- src/features/（Redux構成）
  - ドメインごとに状態管理を分離（account、tips、topics など）
- src/pages/
  - 画面ごとの構成（マイページ、ダッシュボード、Tips投稿など）
- src/store/
  - Reduxストアの生成・ミドルウェア設定など
- src/utils/
  - 色変換などの共通ユーティリティ群
- BaseApp.tsx / index.tsx
  - アプリ全体のルーティング、レンダリングを担当

※App.tsxは現在不使用

```
frontend_react/
├── public/                # 静的ファイル（index.htmlやfaviconなど）
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/                   # ソースコード本体
│   ├── components/        # UIコンポーネント（ヘッダー、サイドメニュー等）
│   ├── data/              # 仮データ・JSONファイル群
│   ├── features/          # Redux機能別Slice（account, tips, topicsなど）
│   ├── pages/             # ページ単位コンポーネント（画面構成）
│   ├── reducers/          # Redux用共通アクション型・まとめ
│   ├── store/             # Reduxストア設定
│   ├── utils/             # 共通ユーティリティ（色変換など）
│   ├── App.tsx            # ルーティング・全体構造
│   ├── index.tsx          # エントリーポイント
│   └── その他（CSS、型定義、テスト関連）
│
├── Dockerfile             # Dockerビルド用
├── package.json           # 使用ライブラリ・スクリプト定義
├── tsconfig.json          # TypeScript設定
└── README.md
```


## ER図

以下にER図を示します。


## Dockerのセットアップと立ち上げ方法

### 前提条件

- Dockerがインストールされていること
- Docker Composeがインストールされていること

### セットアップ

1. プロジェクトのルートディレクトリに移動します。

```bash
cd /path/to/project-root
```

2. Docker Composeを使用してコンテナをビルドし、起動します。

```bash
docker compose up --build
```

3. バックグラウンドで起動させる場合は初回に以下コマンドを実行

```bash
docker compose up -d
```


### コンテナの停止

```bash
docker compose down
```

※バージョンの関係上で `docker-compose` が使えないため、 `docker compose` としてください。


## 開発環境: localhostとログイン方法

### フロントエンド
フロントエンドは、以下のURLでアクセスできます。

```
http://localhost:3000
```

### バックエンド
バックエンドは、以下のURLでアクセスできます。

```
http://localhost:8000
```

### ログイン方法

1. フロントエンドのログインページにアクセスします。
2. 登録済みのメールアドレスとパスワードを入力してログインします。

### 簡単なプレビュー

- **ダッシュボード**: ログイン後、ダッシュボードページにアクセスできます。ここでは、参加プロジェクト、ポートフォリオ、活動記録などが表示されます。
- **プロジェクト一覧**: 「詳細を見る」リンクをクリックすると、プロジェクトの詳細一覧ページに移動します。
- **ポートフォリオ一覧**: 「詳細を見る」リンクをクリックすると、ポートフォリオの詳細一覧ページに移動します。
- **活動記録一覧**: 「詳細を見る」リンクをクリックすると、活動記録の詳細一覧ページに移動します。

## その他

- 詳細な設定やカスタマイズについては、各ディレクトリ内のREADMEファイルを参照してください。
- 問題が発生した場合は、issueを作成してください。


## 参考

- [Djangoでのwebアプリの作成[基礎編〜Djangoディレクトリの階層説明〜]](https://qiita.com/JavaLangRuntimeException/items/8787692aaf9b1d943205)
