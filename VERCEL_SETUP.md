# Vercel デプロイ設定ガイド

## 🚀 初回セットアップ

### 1. Vercel CLI のインストール（まだの場合）
```bash
npm install -g vercel
```

### 2. Vercel にログイン
```bash
vercel login
```

### 3. プロジェクトを Vercel にリンク
```bash
vercel link
```

プロンプトに従って：
- Scope: あなたのVercelアカウント/チームを選択
- Link to existing project: Yes
- Project name: `my-discord-app` を選択（または新規作成）

### 4. 環境変数を設定
```bash
# Discord Client ID を設定
vercel env add VITE_DISCORD_CLIENT_ID

# 値の入力を求められるので、Discord Application ID を貼り付け
# 環境を選択: Production, Preview, Development すべて選択推奨
```

### 5. デプロイ実行
```bash
# 本番環境にデプロイ
vercel --prod
```

## 🔧 既存プロジェクトの再接続

GitHubの自動デプロイで認証エラーが出る場合：

### 手順 A: Vercel Dashboard から再接続

1. https://vercel.com/dashboard にアクセス
2. プロジェクト `my-discord-app` を選択
3. **Settings** → **Git** タブ
4. **Disconnect** してから **Connect Git Repository** で再接続
5. リポジトリ `Metagri-Bot/discord-game-app` を選択
6. 必要な権限を許可

### 手順 B: GitHub App の権限を再承認

1. GitHubの設定 → **Applications** → **Installed GitHub Apps**
2. **Vercel** を探して **Configure** をクリック
3. **Repository access** でリポジトリへのアクセスを確認
4. 必要に応じて **Save** して権限を更新

## 📋 環境変数の設定確認

Vercel Dashboard で以下を確認：

**Settings → Environment Variables**

必要な変数：
- `VITE_DISCORD_CLIENT_ID`
  - Value: あなたのDiscordアプリケーションID
  - Environments: Production, Preview, Development

## 🎯 自動デプロイの設定

**Settings → Git** で以下を確認：

- ✅ Production Branch: `main` または `master`
- ✅ Deploy Hooks: 有効
- ✅ Ignored Build Step: 無効（または空）
- ✅ Auto Deploy: 有効

## ⚠️ トラブルシューティング

### "Authorization required" エラーが出る場合

```bash
# Vercel CLIから手動でデプロイ
vercel --prod

# または、プレビューデプロイで確認
vercel
```

### ビルドエラーが出る場合

環境変数が正しく設定されているか確認：
```bash
vercel env ls
```

### デプロイログの確認

Vercel Dashboard → プロジェクト → **Deployments** で最新のデプロイログを確認
