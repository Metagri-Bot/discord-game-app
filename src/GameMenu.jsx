/**
 * ゲームメニューコンポーネント
 * クリックゲームとタイピングゲームの選択画面
 */
import { useNavigate } from "react-router-dom";

export default function GameMenu() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2c2f33",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎮 ゲームメニュー</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "3rem", color: "#b9bbbe" }}>
        遊びたいゲームを選んでください
      </p>

      <div style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <button
          onClick={() => navigate("/ClickGame")}
          style={{
            width: "300px",
            height: "200px",
            fontSize: "1.5rem",
            backgroundColor: "#5865F2",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4752C4";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#5865F2";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span style={{ fontSize: "4rem" }}>🐄</span>
          <span>クリックゲーム</span>
        </button>

        <button
          onClick={() => navigate("/typing")}
          style={{
            width: "300px",
            height: "200px",
            fontSize: "1.5rem",
            backgroundColor: "#57F287",
            color: "#1e1f22",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#3BA55C";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#57F287";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span style={{ fontSize: "4rem" }}>⌨️</span>
          <span>タイピングゲーム</span>
        </button>
      </div>

      <p style={{
        marginTop: "3rem",
        fontSize: "0.9rem",
        color: "#72767d"
      }}>
        Discord Embedded App で動作中
      </p>
    </div>
  );
}
