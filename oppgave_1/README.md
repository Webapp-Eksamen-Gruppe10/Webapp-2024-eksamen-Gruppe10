# Eksamen: Oppgave 1
## API-endepunkter

### Course-ressurs

| HTTP Metode | Endepunkt               | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|--------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses`        | Hent en liste over alle kurs.                 | `200 OK`, JSON-liste av kurs       | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses`        | Opprett et nytt kurs.                         | `201 Created`, Ny kurs-JSON        | `400 Bad Request`, `500 Internal Server Error`, `409 Not Unique` |
| `GET`       | `/api/v1/courses/{courseSlug}`   | Hent detaljene til et spesifikt kurs.         | `200 OK`, JSON av kurs             | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/courses`   | Oppdater deler av kurset.                     | `200 OK`, Oppdatert kurs-JSON      | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/courses/{id}`   | Slett et kurs.                                | `200 OK`, courseId                   | `404 Not Found`, `500 Internal Server Error` |


### Comment-ressurs

| HTTP Metode | Endepunkt                                                | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|-----------------------------------------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/lessons/{lessonId}/comments`  | Hent alle kommentarer på en leksjon.          | `200 OK`, JSON-liste av kommentarer| `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/lessons/{lessonId}/comments`  | Legg til en kommentar til en leksjon.         | `201 Created`, Ny kommentar-JSON   | `400 Bad Request`, `500 Internal Server Error` 


## Hvilke sider skal benytte de ulike API-ene

### Home 
for å hente alle publiserte kurs: fetch(`/api/v1/courses`): METODE GET 

### CoursePage 
for å hente valgt kurs: fetch(`api/v1/courses/{courseSlug}`): METODE GET 
for å hente alle leksjoner innenfor kurset: fetch(`api/v1/courses/{courseSlug}`): METODE GET (Alle leksjoner ligger i et course objekt)

### LessonPage 
for å hente valgt lesson: fetch(`api/v1/courses/{courseSlug}`): METODE GET (Alle leksjoner ligger i et course objekt) 
for å hente ut alle kommentar for en leksjon: fetch(`/api/v1/courses/{courseId}/lessons/{lessonId}/comments`): METODE GET
for å legge til kommentar til en leksjon: fetch (`/api/v1/courses/{courseId}/lessons/{lessonId}/comments`): METODE POST


### CreateCoursePage
for å opprette en kurs med leksjoner: fetch( `/api/v1/courses`): METODE POST

### UpdateCoursePage
for å hente valgt kurs: fetch(`api/v1/courses/{courseSlug}`): METODE GET
for å oppdatere en kurs, samt oppdatere leksjoner: fetch (`/api/v1/courses`): METODE PATCH
