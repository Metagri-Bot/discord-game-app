import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DiscordSDK } from "@discord/embedded-app-sdk";
import GameMenu from "./GameMenu.jsx";
import ClickGame from "./ClickGame.jsx";
import TypingGame from "./TypingGame.jsx";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isDiscordContext, setIsDiscordContext] = useState(false);

  useEffect(() => {
    // Discord内で開かれたかどうかを検出
    const checkDiscordContext = () => {
      // URLに frame_id パラメータがあるかチェック
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.has('frame_id') || window.parent !== window;
    };

    const isInDiscord = checkDiscordContext();
    setIsDiscordContext(isInDiscord);

    // Discord SDK の初期化（Discord内の場合のみ）
    const initDiscord = async () => {
      if (!isInDiscord) {
        // Discord外で開かれた場合は、SDKなしで即座に表示
        console.log("ℹ️ 通常のブラウザで開かれました。SDKなしで動作します。");
        setIsReady(true);
        return;
      }

      try {
        // Discord SDKインスタンスを初期化
        const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

        // SDK の準備完了を待機
        await discordSdk.ready();

        // OAuth2 認証を実行
        await discordSdk.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          scope: "identify",
        });

        console.log("✅ Discord SDK の準備と認証が完了しました");
        setIsReady(true);
      } catch (err) {
        console.error("❌ Discord SDK の初期化に失敗しました:", err);
        console.log("⚠️ SDKなしで続行します");
        // エラーが発生してもゲームは表示する
        setIsReady(true);
      }
    };

    initDiscord();
  }, []);

  // 初期化中の表示
  if (!isReady) {
    return (
      <div style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#2c2f33",
        color: "#ffffff"
      }}>
        <h2>🎮 ゲームを読み込み中...</h2>
        <p>{isDiscordContext ? "Discord SDK を初期化中..." : "ゲームを準備中..."}</p>
      </div>
    );
  }

  // ゲームルーティングを表示
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/click" element={<ClickGame />} />
        <Route path="/typing" element={<TypingGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;