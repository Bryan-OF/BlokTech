# BlokTech - Game Together

Welkom op mijn BlokTech Project: Game Together, de webapplicatie die gamers helpt samen te spelen. Met Game Together kun je een groep aanmaken om samen een bepaald spel te spelen of iemand aan je team toevoegen als je spelers nodig hebt.

## Inhoudsopgave

- [Functie](#functie)
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)
- [Technologieën](#technologieën)
- [Bijdragen](#bijdragen)
- [Licentie](#licentie)

## Functie

De functie die ik koos om voor mijn project te ontwikkelen, de functie is Liking. Hiermee kunnen gebruikers hun eigen lijst met favoriete games maken, zodat anderen kunnen zien welke games ze spelen en op welk platform. Dit maakt het nog makkelijker om gelijkgestemde gamers te vinden om samen te spelen.

## Installatie

1. Clone de repository
2. Installeer de benodigde dependencies met `npm install`
3. Maak een `.env` bestand aan en voeg je MongoDB URI toe
4. Start het project met `npm start`

## Gebruik

De webapplicatie bevat de volgende pagina's:

- Homepagina: Toont een lijst met games.
- Profielpagina: Toont de favoriete games van een gebruiker.

## API Endpoints

- `POST /like`: Voeg een game toe aan de favorieten van een gebruiker.
- `POST /unlike`: Verwijder een game uit de favorieten van een gebruiker.
- `GET /profile/:userId`: Toon de profielpagina van een gebruiker met hun favoriete games.
- `GET /home`: Toon de homepagina met een lijst van games.
- `POST /update-username`: Update de gebruikersnaam.
- `GET /delete-username`: Verwijder de gebruikersnaam.
- `GET /username`: Haal de huidige gebruikersnaam op.

## Technologieën

- Node.js
- Express
- MongoDB
- EJS
- Multer
- CORS

## Bijdragen

Ik verwelkom alle hulp om het Game Together project te verbeteren! Als je wilt helpen, volg dan deze stappen:

1. Maak een kopie (fork) van het project.
2. Maak een nieuwe tak (branch) met een duidelijke naam, bijvoorbeeld `nieuwe-functie` of `bug-oplossen`.
3. Doe je aanpassingen in die tak.
4. Zorg dat je code goed past bij de rest van de code en dat je niks kapot maakt.
5. Test je aanpassingen goed en zorg dat alles nog werkt.
6. Sla je aanpassingen op (commit) met een korte uitleg van wat je hebt gedaan.
7. Vraag of je aanpassingen mogen worden toegevoegd (pull request) aan het hoofdproject. Leg uit wat je hebt veranderd, waarom en hoe je het hebt getest.

Als je problemen vindt of nieuwe ideeën hebt, open dan een nieuw probleem (issue) op de [issue tracker](https://github.com/Bryan-OF/gametogether/issues). Leg duidelijk uit wat het probleem is of wat je idee is en hoe je het probleem kunt laten gebeuren (als dat kan).

Ik kijk uit naar je bijdrage en geven zal je advies geven om het nog beter te maken. Bedankt voor je hulp bij Game Together!

## Licentie

Dit project is gelicenseerd onder de Apache License 2.0. Zie het [LICENSE](LICENSE) bestand voor de volledige licentietekst.