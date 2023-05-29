# Projektarbete: Webbshop - by Groove

## Dynamisk Webbutveckling

**Mål:**
Ni skall bygga en webbshops-applikation inkluderande en klient och en server. Servern ska vara kopplad till en mongodb databas och vara strukturerad baserad på ett REST-API med resurser. Till er hjälp har ni en uppgiftsbeskrivning samt en kravspecifikation.

**Regler**
Projektet genomförs i grupper om 4 eller 5 personerErt projekt ska skötas från ett gemensamt Github repo. Ni skall använda er av issues och pull request för att strukturera upp erat arbete. I början av projektet skall ni presentera två diagram. Ett ER-diagram över er datastruktur och ett diagram över er server-side kodstruktur. Diagrammen skall uppdateras under projektets gång och lämnas in tillsammans med er kodbas - diagrammen och koden skall stämma överens.Ett gruppkontrakt skall skrivas på och lämnas in.

**Projektledare**
Er grupp skall utse en projektledare vars roll utöver alla andras är att samla ihop gruppen och försöka ha en mer övergripande roll över projektet. Det här ansvarar projektledaren för:-att alla i gruppen har läst och förstått det här dokumentet.-att projektet flyter på enligt planering och samla gruppen till ev. möten.-att fokus är på rätt saker och att alla har något att göra.-ta kontakt med gruppmedlemmar om dom är frånvarande utan att ha meddelat gruppen.

**Betyg**
Projektarbetets betyg beror på er givna idépresentation tillsammans med ert resultat utifrån kravlistan.

## Kravspec

**G**

- [ ] Alla sidor skall vara responsiva. (G)
- [x] Arbetet ska implementeras med en React frontend och en Express backend. (G)
- [ ] Express backenden ska ha validering på samtliga endpoints. (G)
- [x] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
- [x] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- [ ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)

  _Produkter och tillhörande bilder: check, Konton: check_

- [x] Man ska kunna logga in som administratör i systemet (G)
- [x] Inga Lösenord får sparas i klartext i databasen (G)

  _Lösenorden krypteras med bcrypt_

- [ ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [ ] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)

  _Categories sparas som en array på serversidan, enum används för att specificera vilka kategorier som är tillåtna._

- [x] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)

**VG**

- [x] Ett CI flöde ska sättas upp (i början av projektet) som kontrollerar prettier, eslint, typescript & tester i varje PR, tester kan lånas ifrån tidigare uppgifter (VG)

  _Testerna kontrollerar att det på serversidan går att skapa användare, att lösenordet krypteras, att det går att logga in och logga ut_

- [ ] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
- [ ] Administratörer ska kunna redigera produkt inklusive vilka kategorier den tillhör (VG)
- [x] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [x] Backendapplikationen ska ha en fungerande global felhantering (VG)
- [x] En administratör ska kunna uppgradera en användare till administratör (VG)

  _På adminsidan under User Settings listas samtliga användare och man kan härifrån uppgradera konton till Admin-konton_

- [x] Administratörer ska kunna markera beställningar som skickade (VG)

## Redovisningar

**Idégodkännande**
I slutet av veckan ska er grupp presentera en färdig idé på er webbshop tillsammans med en grov sketch på er databasmodell i form av ett enklare ER-Diagram, samt en grov sketch över eran kod i form av ett enklare koddiagram.

Ni skall även presentera gruppens namn, vem som kommer vara projektledare samt lämna in påskriva gruppkontrakt.

**Inlämning av projektet**
Projektet (kodbas & diagram) skall lämnas in på läroplattformen.

Förutom att uppfylla kravspecifikationen, skall erat projekt innehålla en README.md fil där det tydligt skall framgå:Hur projektet installeras och körsVid behov: uppgifter att testa med, så som inloggningsuppgifter.

**OBS:**
Readme filen ska framförallt innehålla en lista över alla kraven i kravspecifikationen nedanför samt en kort kommentar från er - har ni uppfyllt kravet? I så fall, hur?

**Presentation**
Ni ska hålla i en presentation och genomgång av ert slutresultat för projektarbete. Ni ska i presentationen svara på följande frågor:

- Hur såg ert första ER diagram ut?
- Hur ser ert färdiga, normaliserade databasdiagram ut och hur skiljer det sig mot det första?
- Vad skiljde sig från när ni gjorde slutarbetet i Javascript grundkursen?
- Hur har ni delat upp projektet i moduler, klasser etc?
- Vad känner ni att ni framförallt har lärt er under den här kursen?

Efter er presentation ska ni vara beredda att svara på ytterligare frågor från lärare och från andra elever.

## Tips när ni sätter igång

- Prata med varandra - gör en enkel planering - bestäm upplägg, dagar, tider mm
- Läs hela det här dokumentet, det gäller alla i gruppen!
- Viktigt att ni bestämmer er för en mappstruktur, se tips nedan.
- Börja inte koda för tidigt.
- Lägg upp det ni väljer att genomföra från kravspecifikationen som issues på Github.
- Gör er egen grupp i Teams för kommunikation.
- Jobba agilt, stäm av med teamet varje dag och kolla PR’s ofta.

**Hjälp oss lärare hjälpa er!**
Fundera ut bra frågor och ställ dem till oss under handledningen så vi kan förklara för er.
