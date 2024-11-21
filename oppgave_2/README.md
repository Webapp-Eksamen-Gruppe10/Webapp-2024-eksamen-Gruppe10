### API-endepunkter som skal brukes

### Event-ressurs

| HTTP Metode | Endepunkt                 | Beskrivelse                        | Respons ved suksess             | Respons ved feil                      |
|-------------|---------------------------|------------------------------------|----------------------------------|---------------------------------------|
| `GET`       | `/api/v1/events`          | Hent en liste over alle arrangementer. | `200 OK`, JSON-liste av arrangementer | `204 No Content` (ingen arrangementer) |
| `GET`       | `/api/v1/events/{id}`     | Hent detaljer om et spesifikt arrangement. | `200 OK`, JSON av arrangement   | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/events`          | Opprett et nytt arrangement.      | `200 OK`, Nytt arrangement-JSON | `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/events/{id}`     | Slett et arrangement.             | `200 OK`, Slettet arrangement-JSON | `404 Not Found`, `500 Internal Server Error` |

### Registration-ressurs

| HTTP Metode | Endepunkt                                       | Beskrivelse                                | Respons ved suksess                    | Respons ved feil                      |
|-------------|-------------------------------------------------|--------------------------------------------|----------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/events/{id}/registrations`             | Hent alle påmeldinger for et arrangement.  | `200 OK`, JSON-liste av påmeldinger    | `204 No Content` (ingen påmeldinger) |
| `GET`       | `/api/v1/events/{id}/registrations/{id}`        | Hent en spesifikk påmelding for et arrangement. | `200 OK`, JSON av påmelding         | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/events/{id}/registrations`             | Opprett en ny påmelding for et arrangement. | `200 OK`, Ny påmelding-JSON          | `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/events/{id}/registrations/{id}`        | Slett en påmelding til et arrangement.     | `200 OK`, Slettet påmelding-JSON      | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/events/{id}/registrations/{id}`        | Oppdater en eksisterende påmelding.        | `200 OK`, Oppdatert påmelding-JSON    | `404 Not Found`, `500 Internal Server Error` |

