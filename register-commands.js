/**
 * Discord スラッシュコマンド登録スクリプト
 *
 * このスクリプトを実行して、/playgame スラッシュコマンドを Discord に登録します。
 * 初回のみ実行が必要です。
 *
 * 実行方法: node register-commands.js
 */

import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

// 環境変数を読み込み
dotenv.config();

// 登録するスラッシュコマンドの定義
const commands = [
  {
    name: 'playgame',
    description: 'ゲームを開始します',
  },
];

// 環境変数のチェック
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN が設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

if (!process.env.VITE_DISCORD_CLIENT_ID) {
  console.error('❌ VITE_DISCORD_CLIENT_ID が設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

// Discord REST API クライアントを作成
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// スラッシュコマンドを登録
(async () => {
  try {
    console.log('🔄 スラッシュコマンドを登録中...');
    console.log(`📝 登録するコマンド: ${commands.map(c => `/${c.name}`).join(', ')}`);

    // グローバルコマンドとして登録（全サーバーで利用可能）
    await rest.put(
      Routes.applicationCommands(process.env.VITE_DISCORD_CLIENT_ID),
      { body: commands },
    );

    console.log('✅ スラッシュコマンドが正常に登録されました！');
    console.log('💡 Discord サーバーで /playgame を入力して確認してください。');
    console.log('⚠️  反映には最大1時間かかる場合があります。');
  } catch (error) {
    console.error('❌ スラッシュコマンドの登録に失敗しました:', error);

    if (error.code === 50001) {
      console.error('💡 Bot に applications.commands スコープがあるか確認してください。');
    } else if (error.code === 401) {
      console.error('💡 DISCORD_TOKEN が正しいか確認してください。');
    }

    process.exit(1);
  }
})();
