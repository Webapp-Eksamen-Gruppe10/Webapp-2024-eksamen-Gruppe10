### 2.1.2 - 2.1.4 API-endepunkter som skal brukes

### Event-ressurs

| HTTP Metode | Endepunkt                 | Beskrivelse                        | Respons ved suksess             | Respons ved feil                      |
|-------------|---------------------------|------------------------------------|----------------------------------|---------------------------------------|
| `GET`       | `/api/v1/events`          | Hent en liste over alle arrangementer. | `200 OK`, JSON-liste av arrangementer | `204 No Content` (ingen arrangementer) |
| `GET`       | `/api/v1/events?`          | Hent en liste over alle arrangementer med filtrering. | `200 OK`, JSON-liste av arrangementer | `204 No Content` (ingen arrangementer) |
| `GET`       | `/api/v1/events/{id}`     | Hent detaljer om et spesifikt arrangement. | `200 OK`, JSON av arrangement   | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/events`          | Opprett et nytt arrangement.      | `200 OK`, Nytt arrangement-JSON | `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/events/{id}`     | Slett et arrangement.             | `200 OK`, Slettet arrangement-JSON | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`    | `/api/v1/events/{id}`      | Oppdater en eksisterende arrangement.  | `200 OK`, Oppdatert arrangement-JSON | `404 Not Found`, `500 Internal Server Error` |

### Registration-ressurs

| HTTP Metode | Endepunkt                                       | Beskrivelse                                | Respons ved suksess                    | Respons ved feil                      |
|-------------|-------------------------------------------------|--------------------------------------------|----------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/registrations`                       | Hent alle påmeldinger for alle arrangementer.  | `200 OK`, JSON-liste av påmeldinger    | `204 No Content` (ingen påmeldinger) |
| `GET`       | `/api/v1/registrations/{eventId}`             | Hent alle påmeldinger for et arrangement.  | `200 OK`, JSON-liste av påmeldinger    | `204 No Content` (ingen påmeldinger) |
| `GET`       | `/api/v1/registrations/{eventId}/{id}`        | Hent en spesifikk påmelding for et arrangement. | `200 OK`, JSON av påmelding         | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/registrations/{eventId}`             | Opprett en ny påmelding for et arrangement. | `200 OK`, Ny påmelding-JSON          | `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/registrations/{eventId}/{id}`        | Slett en påmelding til et arrangement.     | `200 OK`, Slettet påmelding-JSON      | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/registrations/{eventId}/{id}`        | Oppdater en eksisterende påmelding.        | `200 OK`, Oppdatert påmelding-JSON    | `404 Not Found`, `500 Internal Server Error` |

### Template-ressurs

| HTTP Metode | Endepunkt                | Beskrivelse                                | Respons ved suksess             | Respons ved feil                      |
|-------------|--------------------------|--------------------------------------------|----------------------------------|---------------------------------------|
| `GET`       | `/api/v1/templates`      | Hent en liste over alle templates.         | `200 OK`, JSON-liste av templates | `204 No Content` (ingen templates)   |
| `GET`       | `/api/v1/templates/{id}` | Hent detaljer om en spesifikk template.    | `200 OK`, JSON av template       | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/templates`      | Opprett en ny template.                    | `201 Created`, Ny template-JSON  | `400 Bad Request`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/templates/{id}` | Oppdater en spesifikk template.            | `200 OK`, Oppdatert template-JSON | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`
| `DELETE`    | `/api/v1/templates/{id}` | Slett en spesifikk template.               | `200 OK`, Slettet template-JSON  | `404 Not Found`, `500 Internal Server Error` |


### 2.1.5 Hvilke sider(frontend) som skal benytte de ulike API-ene 

### Homepage 
Funksjonalitet: Se alle events (uten filtrering) og navigerer brukeren til eventspage.  
for å hente alle arrangementer: fetch('/api/v1/events'): Metode GET  

### Eventspage  
Funksjonalitet: se alle arrangementer og filtrere disse på måned, år og type.  
for å hente alle arrangementer: fetch('/api/v1/events?'): Metode GET  

### EventDetailPage 
Funksjonalitet: se en spesfik arrangement med tilhørende data, navigasjon til påmelding samt admin.  
for å hente den spesifikke arrangementet: fetch('/api/v1/events/{id}'): Metode GET  

### RegistrationPage  
Funksjonalitet: lage en påmelding.    
for å sende påmeldingen : fetch('/api/v1/registrations/{eventId}') Metode Post    

### AdminEventRegistrationsPage  
Funksjonalitet: administere påmeldinger til et arrangement.   
for å se alle påmeldinger for et arrangement: fetch('/api/v1/registrations/{eventId}') Metode Get   
for å kunne gjøre en oppdattering av status for en påmelding: fetch('/api/v1/registrations/{eventId}/{id}') Metode Patch  
for å kunne slette en påmelding:  fetch('/api/v1/registrations/{eventId}/{id}') Metode Delete   
for å kunne legge til en manuell påmelding: fetch('/api/v1/registrations/{eventId}') Metode Post  

### AdminEventsPage  
Funksjonaliet: administere alle arrangementer som er laget og ha muligheten til å lage nye arrangementer.   
for å hente alle arrangementer: fetch('/api/v1/events?'): Metode GET   
for å kunne opprette et nytt arrangement: fetch('/api/v1/events'): Metode POST  
for å kunne redigere et arrangement:  fetch('/api/v1/events/{id}'): Metode PATCH  
for å kunne slette et arrangement: fetch('/api/v1/events/{id}'): Metode DELETE   

### AdminStatistics  
Funksjonalitet: Henter statistikk for antall påmeldte per arrangement.  
For å hente ut alle arrangementer: fetch('/api/v1/events'): Metode GET  
for å kunne hente alle registreringer: fetch('/api/v1/registrations'): Metode GET  


