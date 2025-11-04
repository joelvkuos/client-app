import { useState } from "react";

export default function TicketSearch() {
  const [code, setCode] = useState("");
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");

  async function haeLippu() {
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;

    setMessage("Haetaan...");
    setTicket(null);

    try {
      const res = await fetch("https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi/tickets", {
        method: "GET",
        headers: {
          "Authorization": "Basic " + btoa(`${username}:${password}`)
        }
      });

      if (!res.ok) throw new Error("Virhe haussa");

      const data = await res.json();

      const found = data.find(t => t.ticketCode === code);

      if (found) {
        setTicket(found);
        setMessage("");
      } else {
        setMessage("Lippua ei löytynyt");
      }
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function merkitseKaytetyksi() {
    if (!ticket) {
      setMessage("Hae ensin lippu.");
      return;
    }

    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;

    setMessage("Merkitään käytetyksi...");

    try {
      const res = await fetch(
        `https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi/tickets/${ticket.ticketid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${username}:${password}`)
          },
          body: JSON.stringify({ redeemed: true })
        }
      );

      if (!res.ok) throw new Error("Virhe merkinnässä");

      const updated = await res.json();
      setTicket(updated);
      setMessage("Lippu merkitty käytetyksi.");
    } catch (err) {
      setMessage(err.message);
    }
  }
  // esimerkki lippukoodi: MzEy / NDMy -- Tämä vasta demovaiheessa: NjEy --
  return (
    <div>
      <h1>Hae lippu koodilla</h1>
      <input
        type="text"
        placeholder="Syötä lippukoodi:"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={haeLippu}>Hae</button>

      <p>{message}</p>

      {ticket && (
        <div>
          <pre>{JSON.stringify(ticket, null, 2)}</pre>


          {!ticket.redeemed && (
            <button onClick={merkitseKaytetyksi}>Merkitse käytetyksi</button>
          )}
        </div>
      )}
    </div>
  );
}
