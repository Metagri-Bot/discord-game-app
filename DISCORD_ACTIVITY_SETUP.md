# Discord Activity セットアップガイド

Discord内でゲームを直接プレイできるようにするための設定手順です。

## 📋 前提条件

- Vercelへのデプロイが完了していること
- デプロイされたURL（例: https://discord-game-app-xxx.vercel.app）を確認済み

## 🚀 セットアップ手順

### ステップ1: Discord Developer Portalにアクセス

1. https://discord.com/developers/applications にアクセス
2. あなたのアプリケーションを選択

### ステップ2: Activities（アクティビティ）を有効化

#### A. General Information（基本情報）

1. 左メニュー **「General Information」** をクリック
2. 以下の情報を確認：
   - **Application ID**（CLIENT_ID）をコピー
   - これは `.env` の `VITE_DISCORD_CLIENT_ID` と同じ

#### B. Installation（インストール設定）

1. 左メニュー **「Installation」** をクリック
2. **Install Link** で **「Discord Provided Link」** を選択
3. **Default Install Settings** で以下を設定：
   - **Scopes**:
     - ✅ `applications.commands`
     - ✅ `bot`
   - **Permissions**:
     - ✅ `Send Messages`
     - ✅ `Embed Links`

#### C. OAuth2（認証設定）

1. 左メニュー **「OAuth2」** をクリック
2. **Redirects** に以下を追加（Vercelの実際のURLに置き換え）：
   ```
   https://your-vercel-url.vercel.app
   https://your-vercel-url.vercel.app/typing
   ```

   例：
   ```
   https://discord-game-app-xxx.vercel.app
   https://discord-game-app-xxx.vercel.app/typing
   ```

3. **Save Changes** をクリック

#### D. Activities（アクティビティ設定）

**⚠️ 重要**: 2024年時点で、Discord Activitiesは**申請制**または**ベータ機能**の可能性があります。

##### 方法1: Activities タブがある場合

1. 左メニュー **「Activities」** をクリック
2. **「Enable Activity」** または **「New Activity」** をクリック
3. 以下を設定：
   - **Activity Name**: `Game Hub` または任意の名前
   - **URL Mappings**:
     - **Root Mapping** `/` → `https://your-vercel-url.vercel.app`
     - **Path Mapping** `/typing` → `https://your-vercel-url.vercel.app/typing`

##### 方法2: Activities タブがない場合（代替方法）

Discord Activitiesが利用できない場合、**Embedded App SDK**を使用します：

1. 左メニュー **「OAuth2」** → **「General」**
2. **Authorization Method** で **「In-app Authorization」** を選択
3. **Scopes** で以下を選択：
   - ✅ `applications.commands`
   - ✅ `identify`

### ステップ3: Activity URLを取得

Discord Activityとして動作させるには、特別なURLフォーマットが必要です：

```
https://discord.com/activities/{APPLICATION_ID}/{ACTIVITY_ID}
```

しかし、現在の実装では以下の代替方法を使用します：

#### 代替方法A: Embedded App SDK（現在の実装）

ReactアプリでDiscord Embedded App SDKを使用し、Discord内でiframeとして動作させます。

**必要な設定:**
- Vercelにデプロイ済み
- Discord Developer Portalで OAuth2 Redirects 設定済み
- アプリがDiscord内で開かれた時にSDKが初期化される

#### 代替方法B: Discord Application Commands with URLs

ボットのスラッシュコマンドから、Discord内で開けるURLを返します。

### ステップ4: Botコマンドを修正

Discord内でゲームを開くためのボタンURLを、VercelのURLに変更します。

`.env` ファイルに以下を追加：
```env
VERCEL_URL=https://your-actual-vercel-url.vercel.app
```

### ステップ5: 動作確認

1. Discordサーバーで `/playgame` を実行
2. 表示されたボタンをクリック
3. Discord内で新しいウィンドウまたはタブが開く
4. ゲームが表示される

## 🎮 Discord内でネイティブに動作させる（高度な設定）

完全にDiscord内に埋め込んで動作させるには、**Discord Activities Platform**への申請が必要です。

### Discord Activities 申請手順

1. https://discord.com/developers/docs/activities/overview にアクセス
2. ドキュメントを確認
3. 必要に応じてDiscordサポートに問い合わせ

### 参考リンク

- [Discord Activities Overview](https://discord.com/developers/docs/activities/overview)
- [Embedded App SDK](https://discord.com/developers/docs/activities/building-an-activity)
- [Discord Developer Portal](https://discord.com/developers/applications)

## 🐛 トラブルシューティング

### ゲームがDiscord内で開かない

**解決方法:**
1. OAuth2 Redirects が正しく設定されているか確認
2. VercelのURLが正しいか確認
3. ブラウザのコンソールでエラーを確認

### SDK初期化エラー

**解決方法:**
1. `VITE_DISCORD_CLIENT_ID` が正しいか確認
2. Discord Developer Portalの Application ID と一致しているか確認
3. Vercelの環境変数が設定されているか確認

---

**次のステップ**: bot.jsを修正して、VercelのURLを使用するようにします。
