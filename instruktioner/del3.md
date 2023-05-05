# Del 3 - Setup med Node

Tid: ~20 min

Använd er fork av projektet. Startfiler för projektet finns här.
Se över startscript och liknande, se till att ni har en .gitignore som inte checkar in node_modules och eventuellt andra filer som inte ska vara med i repot.

## Paket

Ni behöver installera de paket som behövs.

## Starta

Starta projektet med `npm run dev` och se till att det fungerar.

## Tester

I det här projektet finns ett antal tester, det är en hjälp för er att komma vidare och för att visa vad ni ska arbeta med. De är även en avstämning för när ni ska gå vidare.

För att köra testerna används https://www.npmjs.com/package/jest
Testerna körs med script som finns i `package.json`.

För att köra alla tester en gång, använd:

```bash
npm run test
```

Mer användbar är att starta tester med watch (så de körs automatiskt när ni ändrar i projektet):

```bash
npm run test:watch
```

När jest körs i watch läget så kan ni styra hur det ska köra testerna.
Ni kan till exempel välja att filtrera vilka tester som ska köras. För att göra det så väljer ni `p` och skriver testets namn. För det här projektet finns följande tester:

-   1-server
-   2-login
-   3-auth
-   4-register

Ni kan även köra dem med de script som finns i package.json.

```bash
npm run test:1
npm run test:2
npm run test:3
npm run test:4
```

## Gröna tester

Testerna för denna del kör du genom att köra `npm run test:1`.

Arbeta med att få alla tester att bli gröna. Det vill säga att er kod utför det som den förväntas göra. Detta är en avstämning för att se att ni är på rätt väg.

### Testoutput

När ni kör testerna för första gången kan det se ut ungefär såhär.

```bash
 FAIL  __tests__/1-server.test.js
  1. Setup
    GET /
      ✓ should return a 200 response (27 ms)
      ✓ should return a html response (3 ms)
      ✕ should return a html response with title (4 ms)
    GET /crypt/:pwd
      ✕ should return a 200 response (4 ms)
      ✕ should return a json response (4 ms)
      ✕ should return a json response with encrypted password (2 ms)

       ● 1. Setup › GET /  › should return a html response with title

        expect(received).toContain(expected) // indexOf
```

Detta visar er vilka tester som inte är gröna och vad som är fel. Ni kan se vilken fil och vilken rad som är fel.

Testerna är beskrivande och försöker beskriva vad som är fel. Ni kan använda er av det för att förstå vad som är fel.

```bash
● 1. Setup › GET /  › should return a html response with title
```

Efter detta så följer output från servern som hjälper er att härleda vad som är fel. En stor del av detta projekt är att förstå och kunna läsa felmeddelanden.

## Test 1

Arbeta med att lösa testerna uppifrån och ner. Första testet är att servern ska svara på en GET request till `/`.

Ni får sedan läsa vad som saknas för att testet ska bli grönt.

När testet är grönt går ni vidare till nästa test.

## Bcrypt test /crypt/:pwd

Ni behöver här använda er av en parameter i URL för att läsa in ett lösenord. Detta lösenord ska sedan krypteras med bcrypt och sedan returneras.

Ni gör detta så att ni kan testa bcrypt och få en hash ni sedan kan använda till er user i databasen.
q
Vi behöver använda oss av npm paketet bcrypt för att skapa en lösenordshash.

https://www.npmjs.com/package/bcrypt behöver installeras
Det finns instruktioner för bcrypt på sidan
Skapa en hash/test route att använda för att skapa en hash av ert lösenord, `/crypt/:pwd`

Routen ska returnera en json med hashen. Se testerna.

```js
bcrypt.hash(LÖSENORDSSTRÄNG, 10, function (err, hash) {
    return res.json({ hash });
});
```

## Grönt

Snyggt jobbat ni är nu redo att gå vidare till del 4.

[Del 4](del4.md)
