import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DiscordSDK } from "@discord/embedded-app-sdk";
import ClickGame from "./ClickGame.jsx";
import TypingGame from "./TypingGame.jsx";

// Discord SDK インスタンスを初期化
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Discord SDK の初期化と認証を実行
    const initDiscord = async () => {
      try {
        // SDK の準備完了を待機
        await discordSdk.ready();

        // OAuth2 認証を実行
        await discordSdk.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          scope: "identify",
        });

        console.log("✅ Discord SDK の準備と認証が完了しました");
        setIsAuthorized(true);
      } catch (err) {
        console.error("❌ Discord SDK の初期化に失敗しました:", err);
        setError(err.message);
      }
    };

    initDiscord();
  }, []);

  // エラーが発生した場合の表示
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>エラーが発生しました</h2>
        <p>{error}</p>
        <p>Discord アプリ内で開いているか確認してください。</p>
      </div>
    );
  }

  // 認証中の表示
  if (!isAuthorized) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Discord SDK を初期化中...</p>
      </div>
    );
  }

  // 認証完了後にゲームルーティングを表示
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClickGame />} />
        <Route path="/typing" element={<TypingGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;