import { useEffect, useRef } from "react";
/**
 * クリックゲームコンポーネント
 * ローカルのUnity WebGLビルドを埋め込み表示
 */
export default function ClickGame() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;

    const tryFullscreen = async () => {
      try {
        if (document.fullscreenElement) return;
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      } catch {
        // ブラウザがユーザー操作を要求する場合は失敗しても無視
      }
    };

    // マウント時に試行
    tryFullscreen();

    // iframe のロード完了時にも再試行
    const onLoad = () => tryFullscreen();
    el.addEventListener("load", onLoad);
    return () => el.removeEventListener("load", onLoad);
  }, []);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      overflow: "hidden",
      backgroundColor: "#000000"
    }}>
      <iframe
        ref={iframeRef}
        src="/ClickGame(Cattle)/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0,
          display: "block"
        }}
        title="クリックゲーム"
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  );
}

