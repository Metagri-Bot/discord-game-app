/**
 * Discord ギルド固有スラッシュコマンド登録スクリプト
 *
 * ギルド（サーバー）固有のコマンドを登録します。
 * グローバルコマンドと違い、即座に反映されます（テスト用に最適）。
 *
 * 実行方法: node register-guild-commands.js
 */

import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

// 環境変数を読み込み
dotenv.config();

// 登録するスラッシュコマンドの定義
const commands = [
  {
    name: 'play',
    description: 'ゲームを開始します',
  },
];

// ⚠️ ここにテスト用のギルド（サーバー）IDを設定してください
// ギルドIDの取得方法:
// 1. Discordで開発者モードを有効化（設定 → 詳細設定 → 開発者モード）
// 2. サーバーを右クリック → 「サーバーIDをコピー」
const GUILD_ID = process.env.DISCORD_GUILD_ID || 'YOUR_GUILD_ID_HERE';

// 環境変数のチェック
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN が設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

if (!process.env.VITE_DISCORD_CLIENT_ID) {
  console.error('❌ VITE_DISCORD_CLIENT_ID が設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

if (GUILD_ID === 'YOUR_GUILD_ID_HERE') {
  console.error('❌ GUILD_ID が設定されていません。');
  console.error('💡 .env ファイルに DISCORD_GUILD_ID を追加するか、');
  console.error('💡 このスクリプトの GUILD_ID 変数を直接編集してください。');
  console.error('');
  console.error('ギルドIDの取得方法:');
  console.error('1. Discordで開発者モードを有効化（設定 → 詳細設定 → 開発者モード）');
  console.error('2. サーバーを右クリック → 「サーバーIDをコピー」');
  process.exit(1);
}

// Discord REST API クライアントを作成
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// スラッシュコマンドを登録
(async () => {
  try {
    console.log('🔄 ギルド固有のスラッシュコマンドを登録中...');
    console.log(`🆔 ギルドID: ${GUILD_ID}`);
    console.log(`📝 登録するコマンド: ${commands.map(c => `/${c.name}`).join(', ')}`);

    // ギルド固有のコマンドとして登録（即座に反映）
    await rest.put(
      Routes.applicationGuildCommands(process.env.VITE_DISCORD_CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('✅ スラッシュコマンドが正常に登録されました！');
    console.log('💡 Discord サーバーで /play を入力して確認してください。');
    console.log('🚀 ギルド固有のコマンドは即座に反映されます！');
  } catch (error) {
    console.error('❌ スラッシュコマンドの登録に失敗しました:', error);

    if (error.code === 50001) {
      console.error('💡 Bot に applications.commands スコープがあるか確認してください。');
    } else if (error.code === 401) {
      console.error('💡 DISCORD_TOKEN が正しいか確認してください。');
    } else if (error.rawError?.message?.includes('Unknown Guild')) {
      console.error('💡 GUILD_ID が正しいか確認してください。');
      console.error('💡 Bot がそのサーバーに参加しているか確認してください。');
    }

    process.exit(1);
  }
})();
