# Login

Setup är gjort ```express --no-view --git -css sass``` så kör template och klona.

```bash
cd wsp1-login
npm install
```

## Kravspec

En använda ska kunna logga in med en användare på sidan.
En användare ska kunna logga ut från sin användare.
En användare ska kunna registrera ett nytt konto med användarnamn och lösenord.

* Nytt git repo för gruppen med dokumentation
* Databas, tabell för användare
* Routes enligt REST praxis
* Paket, node, express med nunjucks, sass
* Kodstil, detta ska bestämma, dokumentera och använda .prettierrc

## Databas

Databas ska planeras och skapas.
Tabellen för användare ska heta ```users``` och måste innehålla fält för ```name``` och ```password```. Där password är en varchar för att rymma en bcrypt hash av lösenordet.

## Routes

* get register
* post register
* get login
* post login

**requires auth**
* post logout
* get profile

## Paket

Vilka paket kommer ni att behöva för att kunna köra projektet.

# Arbetsgång

Arbetet är uppdelat i följande huvudmoment, de består i sin tur av ett antal delmoment.

1. Setup
2. Planering
3. Utveckling
4. Koda
5. Extra

Ni kommer att få instruktioner tilldela till er grupp. Varje del kommer att stämmas av med tillhörande tester. När detta är klart så är ni redo att gå vidare till nästa steg. 

## Tester

I det här projektet finns ett antal tester, det är en hjälp för er att komma vidare och för att visa vad ni ska arbeta med. De är även en avstämning för när ni ska gå vidare.

För att köra testerna används https://www.npmjs.com/package/jest
Testerna körs med script som finns i ```package.json```.

För att köra alla tester en gång, använd:
```bash	
npm run test
```

Mer användbar är att starta tester med watch (så de körs automatiskt när ni ändrar i projektet):
```bash
npm run test:watch
```

När jest körs i watch läget så kan ni styra hur det ska köra testerna.
Ni kan till exempel välja att filtrera vilka tester som ska köras. För att göra det så väljer ni ```p``` och skriver testets namn. För det här projektet finns följande tester:
* 1-server
* 2-login
* 3-auth
* 4-register

Ni kan även köra dem med de script som finns i package.json.
```bash	
npm run test:1
npm run test:2
npm run test:3
npm run test:4
```

## Instruktioner

Finns i mappen [instruktioner](/instruktioner/).
Vi kommer att arbeta i grupperna och följa instruktionerna.
Ni kommer att få en tidsram och fördelning om hur ni ska gå tillväga.

# Del 1 - Kom igång

[Den något gamla kursboken som referens](https://jens-andreasson.gitbook.io/webbserverprogrammering/sakerhet/inloggning)

Samla gruppen, få igång projektor och dator. Kolla så att tekniken fungerar.

För lösningen ska det skapas en FORK på detta repo. 

* Koppla upp er på projektor
* Forka
* Klona till lokal dator

Läs igenom instruktioner i README.md om ni inte har gjort det.

[Del 2](del2.md)

# Del 2 - Planering

![flöde](inlog.sv.png)

Upprätta ett planeringsdokument, planering.md.

Ni ska planera följande.

## Databas

Databas ska planeras och skapas.
Tabellen för användare ska heta ```users``` och måste innehålla fält för ```name``` och ```password```. Där password är en varchar för att rymma en bcrypt hash av lösenordet.

Vilka fler fält behöver era användare? Vad ska de användas till? Vilka datatyper ska de ha?

## Routes

Ni behöver planera era routes. Vilka routes behövs för att kunna registrera och logga in användare? Hur ska de skrivas, vilka filer.

Fundera på hur varje route ska designas (CRUD), vad ska sidan innehålla (view) och vad ska backend koden innehålla. Gör anteckningar och fundera på applikationens flöde, rita flödesschema över hur ni tänker er att det sker. I hjälpdokumentet i kursboken finns det ett exempel ni kan titta på.
Om ni skriver i text kan det vara:

Ladda webbroot -> klicka login -> visa formulär -> …

Använd er av whiteboard och fota av eventuellt flöde ni ritar.


* get register
* post register
* get login
* post login

**requires auth**
* post logout
* get profile

## Paket

Vilka paket kommer ni att behöva för att kunna köra projektet.

Åtminstone `bcrypt`, men ni kommer även behöva paket för att spara user för databasen.

[Del 3](del3.md)

# Del 3 - Setup med Node

Använd er fork av projektet. Startfiler för projektet finns här.
Se över startscript och liknande, se till att ni har en .gitignore som inte checkar in node_modules och eventuellt andra filer som inte ska vara med i repot.

## Paket

Ni behöver installera de paket som behövs.

## Starta

Starta projektet med `npm run dev` och se till att det fungerar.

## Tester

I det här projektet finns ett antal tester, det är en hjälp för er att komma vidare och för att visa vad ni ska arbeta med. De är även en avstämning för när ni ska gå vidare.

För att köra testerna används https://www.npmjs.com/package/jest
Testerna körs med script som finns i ```package.json```.

För att köra alla tester en gång, använd:
```bash	
npm run test
```

Mer användbar är att starta tester med watch (så de körs automatiskt när ni ändrar i projektet):
```bash
npm run test:watch
```

När jest körs i watch läget så kan ni styra hur det ska köra testerna.
Ni kan till exempel välja att filtrera vilka tester som ska köras. För att göra det så väljer ni ```p``` och skriver testets namn. För det här projektet finns följande tester:
* 1-server
* 2-login
* 3-auth
* 4-register

Ni kan även köra dem med de script som finns i package.json.
```bash	
npm run test:1
npm run test:2
npm run test:3
npm run test:4
```

## Gröna tester

Testerna för denna del kör du genom att köra ```npm run test:1```.

Arbeta med att få alla tester att bli gröna. Detta är en avstämning för att se att ni är på rätt väg.

När det är klart kan ni gå vidare till nästa steg.

[Del 4](del4.md)

# Del 4 - Login

Ni bör nu vara redo att köra igång och utveckla gruppens applikation.

Validera hela tiden ert arbete mot testerna . Om ni inte kan få testerna att bli gröna så är det något som inte fungerar som det ska.

För att köra tester för denna del så används scriptet ```npm run test:2```.

## Skelett

Börja med att skapa ett skelett för era routes och skapa tillhörande views.
Utgå från er planering.

## Databas

Återanvänd mysql kod från tidigare arbeten. Om ni vill skapa en user/testroute och kolla om kopplingen till databasen fungerar.

## Säkerhet, att hasha lösenord

Innan ni kan spara användare i er databas så behöver ni kunna hasha ett lösenord. Anledningen till att vi gör på det sättet är att vi aldrig ska spara lösenord i läsbar text i en databas, det är av säkerhetsskäl. Så hur sker det då?

Vi behöver använda oss av npm paketet bcrypt för att skapa en lösenordshash.

https://www.npmjs.com/package/bcrypt behöver installeras
Det finns instruktioner för bcrypt på sidan
Skapa en hash/test route att använda för att skapa en hash av ert lösenord

```js
bcrypt.hash(LÖSENORDSSTRÄNG, 10, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    return res.json(hash);
});
```

När det är skapat så använder ni denna output för att skapa/uppdatera en testuser i databasen.

## Login

Vilken route postar ni till?
Vad ska ske på post routen?

Ett flöde kan se ut som följer:

* Skicka data med formulär
* Kontrollera om den kommer fram, req.body
* Vad ska ske sedan?
* Hitta user i databasen, använd WHERE
* Jämför lösenords hash med bcrypt
* Om lösenord och user stämmer
* Sätt session
* redirect
* Om lösenord och user är fel
* Hantera fel
* Hjälp användaren

Kod för att kontrollera lösenord med bcrypt

bcrypt.compare(LÖSENFRÅNFROM, HASHFRÅNDB, function(err, result) {
// result == true logga in, annars buuuu
});

Förfarande kan även skrivas med promises, men då får ni kontrollera detta på bcrypt npm sidan.

## Alla tester är gröna

Snyggt jobbat, dokumentera, comita och pusha till github.

[Del 5](del5.md)

# Del 5 - Auth

I den här delen ska ni skapaa en sida som inte går att komma åt om inte användaren är inloggad. För det behöver ni använda er av sessions.

För att köra testerna för den här delen så används följande kommando:
```bash
npm run test:3
```

## Säkerhet, hemlig sida

När ni skapade skelettet för den hemliga sidan och dess route så säkrade ni den inte, det vill säga att det gick/går att surfa till den.
Nu ska ni använda er av den session parameter ni satte vid inloggningen, för att kontrollera om användaren verkligen är inloggad. Är användaren inloggad ska sidan visas, annars så ska användaren skickas till inloggningsformuläret.

För att göra detta så behöver ni som sagt sessions, det är en parameter som finns tillgänglig i alla routes. Ni kan använda den för att kontrollera om användaren är inloggad eller inte.

https://www.npmjs.com/package/express-session

## Grönt

[Del 6](del6.md)

# Del 6 - Registrera

Nu ska ni skapa koden för att kunna registera en user. Det är en del av CRUD för användare.

För att köra testerna för den här delen så används följande kommando:
```bash
npm run test:4
```

## Registrera ny användare
