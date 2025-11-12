/**
 * クリックゲームコンポーネント
 * ローカルのUnity WebGLビルドを埋め込み表示（自動フルスクリーンは行わない）
 */
export default function ClickGame() {
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
        allowFullScreen
      />
    </div>
  );
}

