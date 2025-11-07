import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

// 環境変数を読み込み
dotenv.config();

// Discord クライアントを作成
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // ギルド（サーバー）情報の取得
    GatewayIntentBits.GuildMessages, // ギルド内のメッセージ取得
    GatewayIntentBits.MessageContent, // メッセージの内容を読み取る権限
  ],
});

// ボットの起動完了時の処理
client.once("ready", () => {
  console.log(`✅ ボットが起動しました: ${client.user.tag}`);
  console.log(`📊 ${client.guilds.cache.size} サーバーに接続中`);
});

// メッセージ受信時の処理
client.on("messageCreate", async (message) => {
  // ボットからのメッセージは無視
  if (message.author.bot) return;

  try {
    // !play コマンドの処理
    if (message.content === "!play") {
      await message.channel.send("🎮 ゲーム開始！");
      // 今後のゲーム処理をここに追加
    }
  } catch (error) {
    console.error("❌ メッセージ処理中にエラーが発生しました:", error);
    // エラーをユーザーに通知（オプション）
    try {
      await message.channel.send("エラーが発生しました。もう一度お試しください。");
    } catch (replyError) {
      console.error("❌ エラーメッセージの送信に失敗しました:", replyError);
    }
  }
});

// スラッシュコマンド実行時の処理
client.on("interactionCreate", async (interaction) => {
  // コマンド以外のインタラクションは無視
  if (!interaction.isCommand()) return;

  try {
    // /play コマンドの処理
    if (interaction.commandName === "playgame") {
      await interaction.reply("🎮 Slash Command でゲーム開始！");
    }
  } catch (error) {
    console.error("❌ インタラクション処理中にエラーが発生しました:", error);
    // エラーをユーザーに通知
    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "エラーが発生しました。もう一度お試しください。",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "エラーが発生しました。もう一度お試しください。",
          ephemeral: true,
        });
      }
    } catch (replyError) {
      console.error("❌ エラーメッセージの送信に失敗しました:", replyError);
    }
  }
});

// エラーハンドリング
client.on("error", (error) => {
  console.error("❌ Discord クライアントエラー:", error);
});

// 環境変数のチェック
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN が設定されていません。.env ファイルを確認してください。");
  process.exit(1);
}

// Discord にログイン
client
  .login(process.env.DISCORD_TOKEN)
  .catch((error) => {
    console.error("❌ Discord へのログインに失敗しました:", error);
    console.error("DISCORD_TOKEN が正しいか確認してください。");
    process.exit(1);
  });