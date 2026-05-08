import { useState, useEffect } from "react"

export default function App() {
  const [notes, setNotes] = useState([])
  const [seen, setSeen] = useState([])
  const [tab, setTab] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/evaluation-service/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "sonasrisr.ct23@bitsathy.ac.in",
        name: "Sona Sri S R",
        rollNo: "7376232CT149",
        accessCode: "uKaJfm",
        clientID: "060ada0c-a03c-4636-87b1-3b784b482b9f",
        clientSecret: "gpHUbnbFRxJWhesD"
      })
    })
    .then(r => r.json())
    .then(d => fetch("/api/evaluation-service/notifications", {
      headers: { Authorization: "Bearer " + d.access_token }
    }))
    .then(r => r.json())
    .then(d => {
      setNotes(d.notifications || [])
      setLoading(false)
    })
  }, [])

  function markRead(id) {
    if (!seen.includes(id)) setSeen([...seen, id])
  }

  const typeWeight = { Placement: 3, Result: 2, Event: 1 }
  const topList = [...notes].sort((a, b) => typeWeight[b.Type] - typeWeight[a.Type]).slice(0, 10)
  const list = tab === "all" ? notes : topList

  if (loading) return <div style={{ padding: 20, textAlign: "center" }}>⏳ Loading...</div>

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