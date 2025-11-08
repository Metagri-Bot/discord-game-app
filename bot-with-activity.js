/**
 * Discord Activity対応版Bot
 *
 * Discord内でゲームを起動できるようにしたバージョン
 */

import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";

// 環境変数を読み込み
dotenv.config();

// Discord クライアントを作成
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Vercel デプロイURL（環境変数から取得）
const VERCEL_URL = process.env.VERCEL_URL || "https://your-app.vercel.app";

// ボットの起動完了時の処理
client.once("ready", () => {
  console.log(`✅ ボットが起動しました: ${client.user.tag}`);
  console.log(`📊 ${client.guilds.cache.size} サーバーに接続中`);
  console.log(`🌐 アクティビティURL: ${VERCEL_URL}`);
});

// メッセージ受信時の処理
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    if (message.content === "!play") {
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle("🎮 ゲームメニュー")
        .setDescription("遊びたいゲームを選んでください！")
        .addFields(
          { name: "🐄 クリックゲーム", value: "カウをクリックしてスコアを稼ごう！", inline: true },
          { name: "⌨️ タイピングゲーム", value: "タイピングスキルを試そう！", inline: true }
        )
        .setFooter({ text: "下のボタンからゲームを起動できます" });

      await message.channel.send({
        embeds: [embed],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 5,
                label: "🎮 Discord内で起動",
                url: VERCEL_URL,
              },
            ],
          },
        ],
      });
    }
  } catch (error) {
    console.error("❌ メッセージ処理中にエラーが発生しました:", error);
    try {
      await message.channel.send("エラーが発生しました。もう一度お試しください。");
    } catch (replyError) {
      console.error("❌ エラーメッセージの送信に失敗しました:", replyError);
    }
  }
});

// スラッシュコマンド実行時の処理
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    // /play または /playgame コマンドの処理
    if (interaction.commandName === "play" || interaction.commandName === "playgame") {
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle("🎮 ゲームメニュー")
        .setDescription("Discord内でゲームをプレイしよう！")
        .addFields(
          { name: "📱 遊び方", value: "下の「Discord内で起動」ボタンをクリック", inline: false },
          { name: "🎯 ゲーム", value: "• クリックゲーム\n• タイピングゲーム", inline: false }
        )
        .setFooter({ text: "Discord Embedded App で動作します" });

      await interaction.reply({
        embeds: [embed],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 5,
                label: "🎮 Discord内で起動",
                url: VERCEL_URL,
              },
            ],
          },
        ],
      });
    }

    // /clickgame コマンドの処理
    if (interaction.commandName === "clickgame") {
      await interaction.reply({
        content: "🐄 **クリックゲーム**\n\nカウをクリックしてスコアを稼ごう！",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 5,
                label: "🎮 Discord内で起動",
                url: VERCEL_URL,
              },
            ],
          },
        ],
      });
    }

    // /typinggame コマンドの処理
    if (interaction.commandName === "typinggame") {
      await interaction.reply({
        content: "⌨️ **タイピングゲーム**\n\nタイピングスキルを試そう！",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 5,
                label: "🎮 Discord内で起動（タイピング）",
                url: `${VERCEL_URL}/typing`,
              },
            ],
          },
        ],
      });
    }
  } catch (error) {
    console.error("❌ インタラクション処理中にエラーが発生しました:", error);
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

if (VERCEL_URL === "https://your-app.vercel.app") {
  console.warn("⚠️  VERCEL_URL が設定されていません。.env ファイルに実際のURLを設定してください。");
}

// Discord にログイン
client
  .login(process.env.DISCORD_TOKEN)
  .catch((error) => {
    console.error("❌ Discord へのログインに失敗しました:", error);
    console.error("DISCORD_TOKEN が正しいか確認してください。");
    process.exit(1);
  });
