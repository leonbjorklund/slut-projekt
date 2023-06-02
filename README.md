# Projektarbete: Webbshop - by Groove

## Företagsidé

Upptäck en värld av förtrollande skönhet och tidlös elegans med By Groove, den ultimata webbshopen för unika och handgjorda vaser. Vårt mål är att förvandla ditt hem eller kontor till en mästerlig konstutställning med vårt handplockade sortiment av extraordinära vaser.

När du kliver in i vår virtuella värld av skönhet, välkomnar vi dig med en världsunik upplevelse. Varje vas vi erbjuder är skapad med passion och omsorg av begåvade konstnärer, som låter sin kreativitet flöda fritt för att skapa verk som tar andan ur dig.

För att förbättra din köpupplevelse har vi skapat en intuitiv webbplattform där du kan utforska våra vaser genom olika kategorier, så att du enkelt hittar det som passar din personliga stil och inredning. Skapa ett konto och låt oss guida dig genom en resa av inspiration och skönhet.

När du väl har hittat den perfekta vasen kan du tryggt lägga till den i din varukorg. Vi tar hand om resten och ser till att din beställning hanteras smidigt och effektivt. Vår automatiserade lagersaldo-funktion garanterar att du alltid får tillgång till de vaser du älskar, medan våra snabba och pålitliga leveranspartner säkerställer att dina skatter når dig säkert och i tid.

Men vi stannar inte där. Vår webbshop erbjuder också en exklusiv administratörsfunktion som ger dig fullständig kontroll över lagersaldo, beställningsstatus och produktuppdateringar. Ge fler personer möjligheten att dela denna fantastiska upplevelse genom att utse fler administratörer som kan bidra till att forma By Groove till det mest spännande och framstående företaget i branschen.

Välkommen till By Groove, där varje vas är en källa till glädje, inspiration och oförglömlig skönhet. Låt oss hjälpa dig att skapa ett utrymme som berättar din unika historia och förhöjer dina mest älskade platser till nya höjder.

## Beskrivning

Ett projekt som har baserats på en tidigare webbshop där enbart frontend var implementerad. Syftet med detta projekt var att skapa en tillhörande backend med server och databas där alla produkter, användare och ordrar lagras. Backend är uppbyggt med en Express server och en Mongo DB databas. CRUD har använts för samtliga endpoints.

På client sidan användas React och Typescript ihop med designsystemet Chakra UI.

Bidragande utvecklare:

Jennifer Techel
Gabriel Lugo Méndez
Madeleine Gustafsson
Leon Björklund

## Starta Projektet

Här är en lista på de olika skripten som kan köras i terminalen:

- `npm run setup` - Installerar alla NodeJS moduler i client och server mapparna (körs en gång).
- `npm run client` - Startar Vite dev servern.
- `npm run server` - Startar server och connectar till databas.
- `npm run test` - Startar testmiljön.

## Kravspec

**G**

- [x] Alla sidor skall vara responsiva. (G)
      _Responsiv ner till 360 px, anpassad för mobile, tablet och desktop med hjälp av Chakra_

- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)
      _Det stämmer_

- [x] Express backenden ska ha validering på samtliga endpoints. (G)
      _Validering har skapats med hjälp av Zod och middlewares_

- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
      _Första utkast har presenterats vid idépresentation och senaste lämnas in via ItsLearning_

- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
      _Utfört vid presentation, en uppdaterad variant hittas högst upp i denna fil_

- [x] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
      _Samtlig data sparas i en mongo databas, och hanteras med hjälp av CRUD operationer_

- [x] Man ska kunna logga in som administratör i systemet (G)
      _Hanteras i user-controller och kan även uppdateras via gränssnittet_
- [x] Inga Lösenord får sparas i klartext i databasen (G)
      _Lösenorden krypteras med bcrypt_

- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
      _En beställning kan läggas av en inloggad användare som fyllt i korrekta uppgifter vilket kontrolleras av både frontend och backend validering. Lagersaldot på en produkt uppdateras automatiskt_

- [x] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
      _Kan hanteras när en användare redigerar en produkt, logiken finns i product-controller_

- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
      _Enbart en administratör kan se samtliga beställningar, vilket skyddas både i frontend och backend med hjälp av isAdmin-validering. Alla ordrar listas upp efter ett fetch anrop till GET endpointen inom order_

- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
      _Categories sparas som en array på serversidan, enum används för att specificera vilka kategorier som är tillåtna._

- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
      _Samtliga produkter hämtas genom ett fetch antrop i ProductContext, och filtreringen av kategorier sker genom inom frontend_

- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
      _Logik återanvänd från första kodbasen, kundkorgen hantera i CartContext och sparas med hjälp av en hook i local-storage. Varukorgen töms automatiskt när en användare loggar ut_

- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
      _Validering för att vara inloggad sker på server-sidan i funktionen som skapar en ny order i order-controller, och gränssnittet är förändrat för en icke inloggad användare med en hänvisning till att logga in eller registrera sig innan en order kan skapas_

- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
      _Valideras med hjälp av formik och yup_

**VG**

- [x] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)
      _Testerna kontrollerar att det på serversidan går att skapa användare, att lösenordet krypteras, att det går att logga in och logga ut_

- [x] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
      _Hittas under My Orders och hämtar varje order för userId från databasen genom fetchanrop i OrderContext_

- [x] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)
      _Löst genom att återanvända samma formulär som för att lägga till en ny produkt, där den valda produktens values tilldelas varje input fält. Valideras i frontend med Yup och i backend med Zod_

- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)
      _Samma logik som från första kodbasen, men med en isAdmin validering för att detta ska vara möjligt, och validering för input fält med Yup i frontend och Zod i backend_

- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)
      _Det finns en global error handler som används på backend såväl som frontend_

- [x] En administratör ska kunna uppgradera en användare till administratör (VG)
      _På adminsidan under User Settings listas samtliga användare och man kan härifrån uppgradera konton till Admin-konton_

- [x] Administratörer ska kunna markera beställningar som skickade (VG)
      _Hanteras via order-controller och valideras i en middleware_
