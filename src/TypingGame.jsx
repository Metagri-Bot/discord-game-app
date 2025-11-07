/**
 * タイピングゲームコンポーネント
 * itch.io からタイピングゲームを埋め込み表示
 */
export default function TypingGame() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>⌨️ タイピングゲーム</h2>
      <iframe
        frameBorder="0"
        src="https://itch.io/embed/3605107"
        width="552"
        height="167"
        style={{ margin: "0 auto" }}
        title="タイピングゲーム by solsol08"
      >
        <a href="https://solsol08.itch.io/typing-game">
          タイピングゲーム by solsol08
        </a>
      </iframe>
    </div>
  );
}