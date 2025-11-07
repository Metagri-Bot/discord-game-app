# 🎮 Discord ゲームアプリ

Discord 内で動作するゲームアプリケーションです。クリックゲームとタイピングゲームをDiscord上で楽しむことができます。

[![Vercel Deploy](https://img.shields.io/badge/Vercel-deployed-success)](https://vercel.com/noujoujins-projects/discord-game-app)

## 📋 目次

- [特徴](#特徴)
- [技術スタック](#技術スタック)
- [セットアップ](#セットアップ)
- [Bot の使い方](#bot-の使い方)
- [開発](#開発)
- [デプロイ](#デプロイ)
- [トラブルシューティング](#トラブルシューティング)

---

## ✨ 特徴

### 🤖 Discord Bot
- **テキストコマンド**: `!play` でゲームを開始
- **スラッシュコマンド**: `/play` でゲームを開始
- エラーハンドリング完備
- 日本語サポート

### 🎨 埋め込みゲームアプリ
- **クリックゲーム**: 🐄 カウをクリックして楽しむゲーム
- **タイピングゲーム**: ⌨️ タイピングスキルを試すゲーム
- Discord Embedded App SDK を使用した埋め込み対応
- React + Vite による高速な開発体験

---

## 🛠️ 技術スタック

### フロントエンド
- **React 19.1.0** - UI フレームワーク
- **Vite 6.3.5** - 高速ビルドツール
- **React Router DOM 7.6.2** - ルーティング
- **@discord/embedded-app-sdk 2.0.0** - Discord 埋め込みアプリ SDK

### バックエンド（Bot）
- **discord.js 14.20.0** - Discord API ラッパー
- **Node.js** - JavaScript ランタイム
- **dotenv** - 環境変数管理

### デプロイ
- **Vercel** - フロントエンドホスティング
- **GitHub** - バージョン管理

---

## 🚀 セットアップ

### 前提条件

- Node.js 18.x 以上
- npm または yarn
- Discord アカウント
- Discord Developer Portal でアプリケーションを作成済み

### 1. リポジトリをクローン

```bash
git clone https://github.com/Metagri-Bot/discord-game-app.git
cd discord-game-app
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数を設定

`.env.sample` をコピーして `.env` ファイルを作成：

```bash
cp .env.sample .env
```

`.env` ファイルを編集して、以下の値を設定：

```env
# Discord Bot のトークン（Bot タブから取得）
DISCORD_TOKEN=your_discord_bot_token_here

# Discord アプリケーションのクライアント ID（General Information から取得）
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here
```

### 4. Discord Developer Portal での設定

#### A. Bot の設定

1. [Discord Developer Portal](https://discord.com/developers/applications) にアクセス
2. アプリケーションを選択
3. **Bot** タブを開く
4. 以下の権限を有効化：
   - **Privileged Gateway Intents**:
     - ✅ `MESSAGE CONTENT INTENT`
     - ✅ `GUILD MESSAGES`
     - ✅ `GUILDS`
5. **Reset Token** をクリックしてトークンをコピー
6. トークンを `.env` の `DISCORD_TOKEN` に設定

#### B. OAuth2 の設定

1. **OAuth2** タブを開く
2. **Scopes** で以下を選択：
   - `bot`
   - `applications.commands`
3. **Bot Permissions** で以下を選択：
   - `Send Messages`
   - `Read Message History`
   - `Use Slash Commands`
4. 生成された URL を使用してボットをサーバーに招待

#### C. Embedded App の設定

1. **OAuth2** → **General** タブ
2. **Redirects** に Vercel のデプロイ URL を追加
3. **CLIENT ID** をコピーして `.env` の `VITE_DISCORD_CLIENT_ID` に設定

---

## 🤖 Bot の使い方

### Bot を起動

```bash
npm start
```

または

```bash
node bot.js
```

起動すると以下のメッセージが表示されます：

```
✅ ボットが起動しました: YourBotName#1234
📊 5 サーバーに接続中
```

### コマンド一覧

#### 1. テキストコマンド

| コマンド | 説明 | 使用例 |
|---------|------|--------|
| `!play` | ゲームを開始 | Discord のチャンネルで `!play` と入力 |

**実行例:**
```
ユーザー: !play
Bot: 🎮 ゲーム開始！
```

#### 2. スラッシュコマンド

| コマンド | 説明 | 使用例 |
|---------|------|--------|
| `/play` | ゲームを開始 | `/play` を入力して Enter |

**実行例:**
```
ユーザー: /play
Bot: 🎮 Slash Command でゲーム開始！
```

### スラッシュコマンドの登録

初回のみ、スラッシュコマンドを Discord に登録する必要があります：

```bash
# register-commands.js ファイルを作成して実行
node register-commands.js
```

**register-commands.js の内容:**

```javascript
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  {
    name: 'play',
    description: 'ゲームを開始します',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('スラッシュコマンドを登録中...');

  await rest.put(
    Routes.applicationCommands(process.env.VITE_DISCORD_CLIENT_ID),
    { body: commands },
  );

  console.log('✅ スラッシュコマンドが正常に登録されました');
} catch (error) {
  console.error('❌ スラッシュコマンドの登録に失敗しました:', error);
}
```

### Bot の機能

#### エラーハンドリング
- 環境変数が設定されていない場合、エラーメッセージを表示して終了
- Discord への接続エラーを適切に処理
- メッセージ送信エラーを catch して再試行

#### ログ機能
- 起動時にボット名とサーバー数を表示
- エラー発生時に詳細なログを出力
- コマンド実行時のログ記録

---

## 💻 開発

### フロントエンド開発サーバーを起動

```bash
npm run dev
```

開発サーバーが起動します（デフォルト: http://localhost:5173）

### ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

ビルドした成果物をローカルでプレビューします。

### Lint

```bash
npm run lint
```

ESLint でコードをチェックします。

---

## 🌐 デプロイ

### Vercel へのデプロイ

詳細な手順は [VERCEL_SETUP.md](./VERCEL_SETUP.md) を参照してください。

#### クイックスタート

1. **Vercel プロジェクトを作成**
   - https://vercel.com/new にアクセス
   - GitHub リポジトリを選択

2. **環境変数を設定**
   - Vercel Dashboard → Settings → Environment Variables
   - `VITE_DISCORD_CLIENT_ID` を追加

3. **デプロイ**
   - `main` ブランチにプッシュすると自動デプロイ

### Bot のホスティング

**注意**: Vercel は静的サイト/サーバーレス用のため、Bot は別途ホスティングが必要です。

推奨ホスティングサービス:
- [Railway](https://railway.app/) - 簡単セットアップ
- [Heroku](https://www.heroku.com/) - 定番サービス
- [DigitalOcean](https://www.digitalocean.com/) - VPS
- [AWS EC2](https://aws.amazon.com/ec2/) - スケーラブル

---

## 🎮 ゲームの遊び方

### Discord 内でゲームを起動

1. Discord アプリを開く
2. サーバーのチャンネルで `/play` コマンドを実行
3. 埋め込みアプリが起動
4. ゲームを選択：
   - **トップページ (/)**: クリックゲーム
   - **/typing**: タイピングゲーム

### ゲームの切り替え

Discord Embedded App 内で URL を変更してゲームを切り替えることができます。

---

## 📁 プロジェクト構造

```
discord-game-app/
├── src/                      # React アプリのソースコード
│   ├── App.jsx              # メインアプリコンポーネント
│   ├── ClickGame.jsx        # クリックゲームコンポーネント
│   ├── TypingGame.jsx       # タイピングゲームコンポーネント
│   ├── main.jsx             # エントリーポイント
│   └── App.css              # スタイル
├── public/                   # 静的ファイル
├── bot.js                    # Discord Bot のメインファイル
├── .env.sample              # 環境変数のサンプル
├── .env                      # 環境変数（Git 管理外）
├── vercel.json              # Vercel 設定
├── vite.config.js           # Vite 設定
├── package.json             # 依存関係
├── README.md                # このファイル
└── VERCEL_SETUP.md          # Vercel セットアップガイド
```

---

## 🐛 トラブルシューティング

### Bot が起動しない

**問題**: `❌ DISCORD_TOKEN が設定されていません`

**解決方法**:
1. `.env` ファイルが存在するか確認
2. `DISCORD_TOKEN` が正しく設定されているか確認
3. Discord Developer Portal で Token を再生成

---

### Discord SDK の初期化エラー

**問題**: `Discord SDK の初期化に失敗しました`

**解決方法**:
1. Discord アプリ内で開いているか確認（ブラウザでは動作しません）
2. `VITE_DISCORD_CLIENT_ID` が正しく設定されているか確認
3. Vercel の環境変数を確認

---

### スラッシュコマンドが表示されない

**問題**: `/play` が候補に出てこない

**解決方法**:
1. スラッシュコマンドを登録（上記の「スラッシュコマンドの登録」参照）
2. Bot がサーバーに参加しているか確認
3. Bot に `applications.commands` スコープがあるか確認

---

### Vercel のデプロイエラー

**問題**: `Authorization required to deploy`

**解決方法**:
1. Vercel Dashboard で GitHub 連携を確認
2. リポジトリへのアクセス権限を再認証
3. [VERCEL_SETUP.md](./VERCEL_SETUP.md) の手順を参照

---

## 📝 ライセンス

ISC License

---

## 🤝 コントリビューション

1. このリポジトリを Fork
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

---

## 📧 お問い合わせ

問題や質問がある場合は、[Issues](https://github.com/Metagri-Bot/discord-game-app/issues) を作成してください。

---

## 📚 参考リンク

- [Discord.js ガイド](https://discordjs.guide/)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Discord Embedded App SDK](https://discord.com/developers/docs/activities/overview)
- [Vite ドキュメント](https://vitejs.dev/)
- [React ドキュメント](https://react.dev/)
- [Vercel ドキュメント](https://vercel.com/docs)

---

**Made with ❤️ for Discord Gaming Community**
