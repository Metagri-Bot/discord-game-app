/**
 * クリックゲームコンポーネント
 * itch.io からクリックゲームを埋め込み表示
 */
export default function ClickGame() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🐄 クリックゲーム</h2>
      <iframe
        frameBorder="0"
        src="https://itch.io/embed/3613266"
        width="552"
        height="167"
        style={{ margin: "0 auto" }}
        title="クリックゲーム by solsol08"
      >
        <a href="https://solsol08.itch.io/cattle-click-game">
          クリックゲーム２ by solsol08
        </a>
      </iframe>
    </div>
  );
}

