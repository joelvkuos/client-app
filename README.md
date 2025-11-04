# Client-app

## GET Request – Fetch Tickets
The program sends a GET request to the API endpoint:
https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi/tickets
using Basic Authentication.
This request retrieves ticket data from the server.

    try {
      const res = await fetch("https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi/tickets", {
        method: "GET",
        headers: {
          "Authorization": "Basic " + btoa(`${username}:${password}`)
        }

## PATCH Request – Redeem a Ticket
The program sends a PATCH request to the API endpoint:
https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi/tickets/${ticket.ticketid}

The request retrieves a specific ticket by its ticketCode and updates its data to mark the ticket as used (redeemed: true).
It uses Basic Authentication and sends the update in JSON format.

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
  
## Environment Variables

This application requires user credentials stored in a .env file.
The program will only work if valid credentials are provided.