# Del 4 - Login

**Tid: ~60 min**

Ni bör nu vara redo att köra igång och utveckla gruppens applikation.

Validera hela tiden ert arbete mot testerna . Om ni inte kan få testerna att bli gröna så är det något som inte fungerar som det ska.

För att köra tester för denna del så används scriptet `npm run test:2`.

## Skelett

Börja med att skapa ett skelett för era routes och skapa tillhörande views.
Utgå från er planering.

Stäm av med testerna så att ni har rätt routes.

## Databas

Databaskoden för projektet utgår från filen `/utils/database.js`.
Testerna använder den och ni kan använda den i era router.

```js
const pool = require('../utils/database');
```

Se till att ni har `.env` fil för databasuppgifterna. Använd er av skolans server. För att testerna ska fungera krävs att ni anger er grupps tabell.

```
DATABASE_HOST =
DATABASE_USERNAME =
DATABASE_PASSWORD =
DATABASE_DATABASE =
DATABASE_USERSTABLE =
```

## Säkerhet, att hasha lösenord

Innan ni kan spara användare i er databas så behöver ni kunna hasha ett lösenord. Anledningen till att vi gör på det sättet är att vi **aldrig** ska spara lösenord i läsbar text i en databas, det är av säkerhetsskäl.

För att göra detta så använder ni den route ni skrev i föregående del, `/crypt/:pwd`.
Skapa en hash och spara den för er testuser i er databas. Använd er av tableplus för detta, att skapa en ny användare med kod är sista delen av denna uppgift.

## Login

**Tid: ~60 min**

Vilken route postar ni till?
Vad ska ske på post routen?

Ett flöde kan se ut som följer:

-   Skicka data med formulär
-   Kontrollera om den kommer fram, req.body
-   Vad ska ske sedan?
-   Hitta user i databasen, använd WHERE
-   Jämför lösenords hash med bcrypt
-   Om lösenord och user stämmer
-   Sätt session
-   redirect
-   Om lösenord och user är fel
-   Hantera fel
-   Hjälp användaren

Kod för att kontrollera lösenord med bcrypt. Se manualen på [npmjs.com bcrypt](https://www.npmjs.com/package/bcrypt) för mer info.

```js
bcrypt.compare(LÖSENFRÅNFROM, HASHFRÅNDB, function (err, result) {
    // result == true logga in, annars buuuu
});
```

Förfarande kan även skrivas med promises, men då får ni kontrollera detta på bcrypt npm sidan.

## Alla tester är gröna

Snyggt jobbat, dokumentera, comita och pusha till github.

[Del 5](del5.md)
