import { useState, useEffect } from "react"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzb25hc3Jpc3IuY3QyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzNTA0OCwiaWF0IjoxNzc4MjM0MTQ4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYWJkODZhNjAtNzcxZi00NTU5LWFjYjEtNzAwNzdhY2FkYTgyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic29uYSBzcmkgcyByIiwic3ViIjoiMDYwYWRhMGMtYTAzYy00NjM2LTg3YjEtM2I3ODRiNDgyYjlmIn0sImVtYWlsIjoic29uYXNyaXNyLmN0MjNAYml0c2F0aHkuYWMuaW4iLCJuYW1lIjoic29uYSBzcmkgcyByIiwicm9sbE5vIjoiNzM3NjIzMmN0MTQ5IiwiYWNjZXNzQ29kZSI6InVLYUpmbSIsImNsaWVudElEIjoiMDYwYWRhMGMtYTAzYy00NjM2LTg3YjEtM2I3ODRiNDgyYjlmIiwiY2xpZW50U2VjcmV0IjoiZ3BIVWJuYkZSeEpXaGVzRCJ9.Ic4WitoKvg6zoLmJCh6zqMdGE3qHfoEXXW6a9BXYuMk"

export default function App() {
  const [notes, setNotes] = useState([])
  const [seen, setSeen] = useState([])
  const [tab, setTab] = useState("all")

  useEffect(() => {
    fetch("http://4.224.186.213/evaluation-service/notifications", {
      headers: { Authorization: "Bearer " + TOKEN }
    })
    .then(r => r.json())
    .then(d => setNotes(d.notifications || []))
  }, [])

  function markRead(id) {
    if (!seen.includes(id)) setSeen([...seen, id])
  }

  const typeWeight = { Placement: 3, Result: 2, Event: 1 }

  const topList = [...notes]
    .sort((a, b) => typeWeight[b.Type] - typeWeight[a.Type])
    .slice(0, 10)

  const list = tab === "all" ? notes : topList

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Notifications</h2>

      <button onClick={() => setTab("all")} style={{ marginRight: 10, background: tab === "all" ? "blue" : "gray", color: "white", padding: "6px 12px", border: "none", borderRadius: 4 }}>
        All ({notes.length})
      </button>
      <button onClick={() => setTab("priority")} style={{ background: tab === "priority" ? "blue" : "gray", color: "white", padding: "6px 12px", border: "none", borderRadius: 4 }}>
        Top 10
      </button>

      <div style={{ marginTop: 20 }}>
        {list.map(n => (
          <div key={n.ID} onClick={() => markRead(n.ID)}
            style={{ border: "1px solid #ccc", borderRadius: 6, padding: 10, marginBottom: 8, background: seen.includes(n.ID) ? "#f0f0f0" : "#fff", cursor: "pointer" }}>
            <b>{n.Type}</b> {!seen.includes(n.ID) && <span style={{ color: "red" }}>• new</span>}
            <p style={{ margin: "4px 0" }}>{n.Message}</p>
            <small>{n.Timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  )
}