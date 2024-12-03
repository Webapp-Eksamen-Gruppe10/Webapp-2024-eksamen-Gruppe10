# 2.1.2 - 2.1.4 API-endepunkter som skal brukes

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
| `GET`       | `/api/v1/registrations/{eventId}`             | Hent alle påmeldinger for et arrangement.  | `200 OK`, JSON-liste av påmeldinger    | `204 No Content` (ingen påmeldinger) |
| `GET`       | `/api/v1/registrations`             | Hent alle påmeldinger  | `200 OK`, JSON-liste av påmeldinger    | `204 No Content` (ingen påmeldinger) |
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


# 2.1.5 Hvilke sider(frontend) som skal benytte de ulike API-ene 

### Landingsside (/)
<ins>Funksjonalitet:</ins>  
Se alle events (uten filtrering) og navigerer brukeren til eventspage. 

<ins>Bruk av api-endepunkt</ins>  
- For å hente alle arrangementer: `fetch('/api/v1/events')`: Metode GET 

### Arrangementer (/events)
<ins>Funksjonalitet:</ins>  
Se alle arrangementer og filtrere disse på måned og år og type. 

<ins>Bruk av api-endepunkt</ins>  
- For å hente alle arrangementer: `fetch('/api/v1/events?')`: Metode GET 

### Arrangement Detaljer (/events/{eventId})
<ins>Funksjonalitet:</ins>  
Se en spesfik arrangement med tilhørende data, navigasjon til påmelding samt admin. 

<ins>Bruk av api-endepunkt</ins>  
- For å hente den spesifikke arrangementet: `fetch('/api/v1/events/{id}')`: Metode GET

### Registreringsskjema (/events/{eventId}/registration)
<ins>Funksjonalitet:</ins>  
Lage en påmelding. Påmelding krever et navn, e-post og telefonnummer. Dette er validert før innsending. Viser også totalpris for påmelding. 

<ins>Bruk av api-endepunkt</ins>  
- For å sende påmeldingen : `fetch('/api/v1/registrations/{eventId}')` Metode Post

### Administrasjon av Påmeldinger (/admin/events/{eventId}/registrations)
<ins>Funksjonalitet:</ins>  
Administere påmeldinger til et arrangement. Mulighet til å manuelt legge til en påmelding uten å betale. Mulighet til å godkjenne, avslå eller slette påmeldinger.

<ins>Bruk av api-endepunkt</ins>  
- For å se alle påmeldinger for et arrangement: fetch('/api/v1/registrations/{eventId}') Metode Get 
- For å kunne gjøre en oppdattering av status for en påmelding: fetch('/api/v1/registrations/{eventId}/{id}') Metode Patch
- For å kunne slette en påmelding:  fetch('/api/v1/registrations/{eventId}/{id}') Metode Delete 
- For å kunne legge til en manuell påmelding: fetch('/api/v1/registrations/{eventId}') Metode Post

### Admin Arrangementoversikt (/admin/events)
<ins>Funksjonalitet:</ins>  
Administere alle arrangementer som er laget og ha muligheten til å lage nye arrangementer. 

<ins>Bruk av api-endepunkt</ins>  
for å hente alle arrangementer: fetch('/api/v1/events?'): Metode GET 
for å kunne opprette et nytt arrangement: fetch('/api/v1/events'): Metode POST
for å kunne redigere et arrangement:  fetch('/api/v1/events/{id}'): Metode PATCH
for å kunne slette et arrangement: fetch('/api/v1/events/{id}'): Metode DELETE 

### AdminStatistics (/admin/statistics)
<ins>Funksjonalitet:</ins>  
Viser statistikk for antall påmeldt per arrangement. Inkluderer antall påmeldt som er på venteliste.

<ins>Bruk av api-endepunkt</ins> 
- For å kunne hente antall påmeldte: fetch('/api/v1/events'): Metode GET

# 2.1.6 Hvordan filtrering løses i frontend og backend 

### Frontend 
i frontend tenker vi å lagre brukerens valg av kategori, måned og år i en useState, og deretter bruke URLSearchParams() for å konvertere filters til en URL-søkestreng som vi bruker i fetch('/api/v1/events?\${params}'). Vi tenker også bruke router.push('/events?${params}') for å vise det i URL-en til frontend. 

### Backend 
I backend henter vi parametere (måned, år, og kategori) fra URL-en (for eksempel type=sport&year=2024&month=april) som sendes inn fra frontend. Vi bruker disse parameterene
for å gjøre spørringer til databasen og sender ferdig filtrert data til frontend.

# 2.1.7 Datamodellen og bakgrunnen for denne modellen
Bilder av tidligere og nåværende datamodell finner du i `oppgave_2/documentation/databasemodell.`  

Man måtte lage data for maler, events, og registrations. Derfor laget vi 3 tabeller for å reflektere dette. Data som lagres i hver tabell er basert på kravene i oppgaven.  

Eksempeler på krav fra oppgaven som reflekteres i databasen:  
- For å oppfylle kravet: `Hver arrangement skal ha en landingsside med unik slug (urlen til siden. eks dette-er-en-url) / eller id-en til arrangementet` bruker vi `id` fra `event`-tabellen. 
- For å oppfylle kravet: `Bestemme at en mal skal låses til en ukedag(er). Regelen skal da ikke gjøre det mulig å opprette denne på andre dager enn de som er valgt.` bruker vi `weekdays` for å skrive ned hvilke dager events som bruker denne malen er låst til i `template`-tabellen.
  - Vi bruker en boolean på `private`, `notSameDay`, `fixed_price`, `free`, `waitinglist`, og `lim_attend` for å lagre hvilke regler som gjelder for et individuelt arrangement.

# 2.1.8 Hvordan løse vi det å opprette / gjenbruke en mal
Naviger til Admin/Arrangementer og trykk på `Opprett nytt arrangement`.
Dette sender deg til en side som lar deg opprette nytt arrangement.
Denne siden har 2 deler. Den første delen omgår opprettelse og bruk av mal.

Du blir vist en dynamisk liste som inneholder eksisterende maler.
Om du trykker på en av disse malene, vil den automatisk vise hvilke instillinger
denne malen bruker. Malen kan da overskrives ved å endre valgene i formen og trykke på `Oppdater denne malen`. Det eneste som ikke kan overskrives er begrensning av ukedager. Det sjekkes om malen allerede er i bruk før den kan oppdateres. Om den er i bruk, vil knappen bli disabled og få hjelpetekst "Arrangementer bruker denne malen. Kan ikke endres". Mal blir da oppdatert med en patch request til `/api/v1/templates/{id}`.

Om man ikke velger en mal fra listen over eksisterende maler, kan man lage en ny ved å fylle ut formen på denne siden. Disse alternativene inneholder alt for å fylle kravene fra oppgaven. Når du er fornøyd med utseende på malen din kan du trykke på `Lagre denne malen`-knappen som sender inn data med en post request til `/api/v1/templates`.

Om man skal bruke mal må man opprette eller bruke eksisterende mal. Vil man ikke bruke mal, kan man trykke på `Hopp over valg av mal` for å lage et arrangement uten noen ekstra funksjonalitet som begrensning av ukedager, privat arrangement, eller fast pris. Vi valgte å fjerne alle begrensninger når man ikke lagrer en mal, da det ikke var mulig for oss å ta hensyn til disse begrensningene og valgene på andre deler av siden. Et eksempel på dette er når man redigerer et arrangement i ettertid. Uten å ha lagret hvilke valg som ble tatt når brukeren laget arrangementet, var det ikke mulig for oss å ta hensyn til disse valgene i ettertid under f.eks. redigering.  

# 2.1.9 Dokumentere databasemodellen og nødvendige relasjoner

<ins>Nødvendige relasjoner og koblinger:</ins>  
Event og template har et nullable en-til-mange forhold. Dette er grunnet at et event kan lages uten en mal. Da blir template_id null. Et event kan også lages med kun én mal, men ikke flere. Én mal kan være brukt på flere events. Dette er grunnlaget for denne relasjonen. Blir koblet med fremmednøkkel template_id i event-tabellen.

Event og registration har et en til mange forhold, da ett event kan ha flere registreringer, men en registrering kan ikke bli brukt på flere events. Disse er koblet med fremmednøkkel event_id i registration tabellen. 
- NB: Som vi også har beskrevet i grupperapporten, ville det ideelt sett vært en bruker-tabell som inneholder informasjonen om én person som kunne blitt gjenbrukt med registration som mellom-tabell i et mange-til-mange relasjon med event. Da hovedfokuset vårt har vært på å fullføre absolutte krav, og denne spesifikke implementasjonen ikke var et del av et krav, valgte vi å ikke implementere dette. 

<ins>Participant</ins>
Når vi startet å designe participant-tabellen, var tanken at hver participant skulle være en individuell person. Vi tenkte å legge til en ny form og registrering for hver deltager på et arrangement. Senere endret vi til at en "participant" var en individuell bestilling som kunne inneholde flere deltakere. Derfor oppdaterte vi tabellen med et `participants`-felt som inneholder navnet på alle deltakerene. Ideelt sett i en større løsning ville vi laget en `user`-tabell for hver individuelle deltaker, med et mange-til-mange forhold med events. Slik kunne en og samme bruker være deltaker på mange events, og mange events kan ha samme bruker. Grunnet begrenset tid og manglene krav for dette valgte vi å ikke bruke ekstra tid på å implementere dette.


# Generell kildebruk
<ins>Vi har tatt i bruk:</ins>
|Kilde|lenke|Formål|
|--|--|--|
|ChatGPT|https://chatgpt.com/| Brukt til: 1) Å lage overordnet skjelett til HTML - men bygget videre selv. 2) Feilsøking 3) Å gjøre koden ryddigere uten å endre på logikk som f.eks. å legge til kommentarer som forklarer hva komponenten gjør slik at det blir lettere for andre å jobbe med det. 4) Å gjøre noen komponenter mer mobilvennelig 5) Å generere kode basert på egne beskrivelser og justert løsningen etter behov.|
|React dokumentasjon|https://react.dev/|Brukt til å få mer forståelse for aktuelle funksjoner i react.|
|Next dokumentasjon|https://nextjs.org/docs|Brukt til å få mer forståelse av navigering og hvordan komponenter som f.eks. UseRouter fungerer.|
|Prisma dokumentasjon|https://www.prisma.io/docs|Brukt til å lære riktig oppbygging av prisma database.|
|Zod dokumentasjon|https://zod.dev/|Brukt for å forstå bruk av zod validering - spesielt datatyper.|
|DatePicker dokumentasjon|https://reactdatepicker.com/| Brukt i kombinasjon med chatGPT til å forstå bruk og konfigurering av datepicker|
|Tailwind dokumentasjon|https://v2.tailwindcss.com/docs|Brukt til MYE forståelse av komponentbevegelse, tailwind sin implementasjon av flex, farger, grid osv. |
|Toptal|https://www.toptal.com/designers/htmlarrows/symbols/| Brukt til å finne HTML-symboler. |