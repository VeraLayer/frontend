import { useCallback, useState } from "react";
import { veraLayerApi } from "../api/veralayer.api";

export default function AIQueryPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleQuery = useCallback(async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    setToolsUsed([]);
    try {
      const res = await veraLayerApi.query(question);
      setAnswer(res.answer);
      setToolsUsed(res.tools_used);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Query failed");
    } finally {
      setLoading(false);
    }
  }, [question]);
 
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleQuery();
    }
  };
 
  return (
    <div
      style={{
        background: "#090909",
        border: "1px solid #1e1e1e",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 11, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
        AI Agent Query
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about datasets, deal status, verification state…"
          rows={2}
          style={{
            flex: 1,
            background: "#111",
            border: "1px solid #222",
            borderRadius: 8,
            padding: "10px 14px",
            color: "#ccc",
            fontSize: 13,
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleQuery}
          disabled={loading || !question.trim()}
          style={{
            background: loading ? "#1a1a1a" : "#6FEBA0",
            color: loading ? "#444" : "#000",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            alignSelf: "stretch",
            transition: "background 0.15s",
          }}
        >
          {loading ? "…" : "Ask"}
        </button>
      </div>
 
      {error && (
        <p style={{ color: "#FF6B6B", fontSize: 12, marginTop: 10 }}>{error}</p>
      )}
 
      {answer && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6, margin: 0 }}>{answer}</p>
          {toolsUsed.length > 0 && (
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {toolsUsed.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    color: "#555",
                    border: "1px solid #222",
                    borderRadius: 4,
                    padding: "2px 7px",
                    fontFamily: "monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}