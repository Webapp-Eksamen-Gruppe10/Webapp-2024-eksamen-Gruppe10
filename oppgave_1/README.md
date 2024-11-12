# Eksamen: Oppgave 1
## API-endepunkter (3 + 1? features)

### Course-ressurs

| HTTP Metode | Endepunkt               | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|--------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses`        | Hent en liste over alle kurs.                 | `200 OK`, JSON-liste av kurs       | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses`        | Opprett et nytt kurs.                         | `201 Created`, Ny kurs-JSON        | `400 Bad Request`, `500 Internal Server Error` |
| `GET`       | `/api/v1/courses/{id}`   | Hent detaljene til et spesifikt kurs.         | `200 OK`, JSON av kurs             | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/courses/{id}`   | Oppdater deler av kurset.                     | `200 OK`, Oppdatert kurs-JSON      | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/courses/{id}`   | Slett et kurs.                                | `204 No Content`                   | `404 Not Found`, `500 Internal Server Error` |


### Comment-ressurs

| HTTP Metode | Endepunkt                                                | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|-----------------------------------------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments`  | Hent alle kommentarer på en leksjon.          | `200 OK`, JSON-liste av kommentarer| `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments`  | Legg til en kommentar til en leksjon.         | `201 Created`, Ny kommentar-JSON   | `400 Bad Request`, `500 


## Hvilke sider skal benytte de ulike API-ene

### Login
For å lage en bruker: fetch( `/api/v1/users` ): METODE POST

### Home 
for å hente innlogget bruker: fetch(`/api/v1/users/:id`): METODE GET 
for å hente alle publiserte kurs: fetch(`/api/v1/courses`): METODE GET 

### CoursePage 
for å hente valgt kurs: fetch(`api/v1/courses/:id`): METODE GET 
for å hente alle leksjoner innenfor kurset: fetch(`pi/v1/courses/{courseId}/lessons`): METODE GET 

### LessonPage 
for å hente valgt lesson: fetch(`pi/v1/courses/{courseId}/lessons/{lessonId}`): METODE GET 

### CommentPage
for å hente ut alle kommentar for en leksjon: fetch(`/api/v1/courses/{courseId}/lessons/{lessonId}/comments`): METODE GET
for å legge til kommentar til en leksjon: fetch (`/api/v1/courses/{courseId}/lessons/{lessonId}/comments`): METODE POST

### CreateUpdateCoursePage
for å opprette en kurs med leksjoner: fetch( `/api/v1/courses`): METODE POST
for å oppdatere en kurs, samt oppdatere leksjoner: fetch (`/api/v1/courses/{id}`): METODE PATCH


### API Dokumentasjon (W.I.P - Jørgen)
| Endepunkt | Beskrivelse | Verb | Respons | Statuskode |  Returdata | URL |
|--|--|--|--|--|--|--|
| /kurs | Oppretter et nytt kurs | POST | Kursdetaljer | 201, 400, 500 |
| /kurs | Henter alle kurs | GET | Liste med kursdetaljer | 200, 400, 404, 500 | 
| /kurs/:id | Henter et spesifikt kurs | GET | Kursdetaljer | 200, 400, 404, 500 |
| /kurs/:id | Sletter et spesifikt kurs | DELETE | Suksessmelding| 204, 400, 404, 500 |
| /kurs/:id | Oppdaterer et spesifikt kurs| PATCH | Oppdaterte kursdetaljer | 200, 400, 404, 500 | 
| /kurs/:id/leksjoner | Henter alle leksjoner til et spesifikt kurs| GET | Liste med leksjonsdetaljer | 200, 400, 404, 500 | 
| /kurs/:id/leksjoner |  Sletter alle leksjoner til et spesifikt kurs | DELETE | Suksessmelding | 204, 400, 404, 500 | 
| /leksjon | Oppretter en ny leksjon | POST | Leksjonsdetaljer| 201, 400, 404, 500
| /leksjon/:id | Henter en spesifikk leksjon | GET | Leksjonsdetaljer | 200, 400, 404, 500 | 
| /leksjon/:id | Sletter en spesifikk leksjon | DELETE | Suksessmelding | 204, 400, 404, 500 | 
| /leksjon/:id/kommentarer | Sletter alle kommentarer til en spesifikk leksjon | DELETE | Suksessmelding | 204, 400, 404, 500 | 
| /leksjon/:id/kommentarer | Henter alle kommentarer til en spesifikk leksjon | GET | Liste med kommentarer | 200, 400, 404, 500 | 
| /kommentar | Oppretter ny kommentar | POST | Kommentardetaljer | 201, 400, 404, 500
| /kommentar/:id | Sletter en spesifikk kommentar | DELETE | Suksessmelding | 204, 400, 404, 500
