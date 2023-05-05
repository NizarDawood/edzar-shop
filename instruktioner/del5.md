# Del 5 - Auth

**Tid: ~60 min**

I den här delen ska ni skapaa en sida som inte går att komma åt om inte användaren är inloggad. För det behöver ni använda er av sessions.

För att köra testerna för den här delen så används följande kommando:
```bash
npm run test:3
```

## Säkerhet, hemlig sida

**Tid: ~60 min**

När ni skapade skelettet för den hemliga sidan och dess route så säkrade ni den inte, det vill säga att det gick/går att surfa till den.
Nu ska ni använda er av den session parameter ni satte vid inloggningen, för att kontrollera om användaren verkligen är inloggad. Är användaren inloggad ska sidan visas, annars så ska användaren skickas till inloggningsformuläret.

För att göra detta så behöver ni som sagt sessions, det är en parameter som finns tillgänglig i alla routes. Ni kan använda den för att kontrollera om användaren är inloggad eller inte.

https://www.npmjs.com/package/express-session

## Grönt

[Del 6](del6.md)