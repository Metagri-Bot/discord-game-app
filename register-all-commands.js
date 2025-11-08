/**
 * Discord スラッシュコマンド登録スクリプト（ゲームリンク付き）
 *
 * /play コマンドに加えて、各ゲーム専用のコマンドを登録します。
 * - /play: ゲーム選択メニュー
 * - /clickgame: クリックゲームを直接起動
 * - /typinggame: タイピングゲームを直接起動
 */

import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  {
    name: 'play',
    description: 'ゲームメニューを表示します',
  },
  {
    name: 'playgame',
    description: 'ゲームメニューを表示します（エイリアス）',
  },
  {
    name: 'clickgame',
    description: 'クリックゲームを起動します',
  },
  {
    name: 'typinggame',
    description: 'タイピングゲームを起動します',
  },
];

// ギルドID（即座に反映させるため）
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!process.env.DISCORD_TOKEN || !process.env.VITE_DISCORD_CLIENT_ID) {
  console.error('❌ 環境変数が設定されていません');
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 スラッシュコマンドを登録中...');
    console.log(`📝 登録するコマンド: ${commands.map(c => `/${c.name}`).join(', ')}`);

    if (GUILD_ID && GUILD_ID !== 'your_guild_id_here') {
      // ギルド固有コマンド（即座に反映）
      await rest.put(
        Routes.applicationGuildCommands(process.env.VITE_DISCORD_CLIENT_ID, GUILD_ID),
        { body: commands },
      );
      console.log(`✅ ギルド固有コマンドを登録しました（ギルドID: ${GUILD_ID}）`);
      console.log('🚀 即座に反映されます！');
    } else {
      // グローバルコマンド
      await rest.put(
        Routes.applicationCommands(process.env.VITE_DISCORD_CLIENT_ID),
        { body: commands },
      );
      console.log('✅ グローバルコマンドを登録しました');
      console.log('⚠️  反映には最大1時間かかる場合があります');
    }
  } catch (error) {
    console.error('❌ 登録に失敗しました:', error);
    process.exit(1);
  }
})();
