# cams
[![Build Status](https://dev.azure.com/davidmicevski/CAMS/_apis/build/status/Micevski.cams?branchName=develop)](https://dev.azure.com/davidmicevski/CAMS/_build/latest?definitionId=1&branchName=develop)


### CAMS

Ovaa aplikacija e izrabotena za predmetot WEB PROGRAMIRANE od FINKI.
Glavnata namena na aplikacijata e elektrosnko zaveduvanje i menadziranje na soobrakjani nezgodi. Ili da nareceme nesto kako elektronski zapisnik za soobrakajna nezgoda. 

Ovaa aplikacija e izrabotena so slednive tehnologii: 
Spring Boot 
Anglar 9 
Postgresql DB

Za da ja startuvate Spring Boot back end aplikactijata so azure baza potrebno e da ja izvrsite slednava komanda dokolku ja startuvate od linux vo root direktoriumot na aplikacijata odnosno cams.
`./gradlew bootRun --args '--spring.profiles.active=azure'`

Za lokalna baza ke mora da ja namestete vasta loklana konifugracija za postgres bazata vo 
`application.properites` file-ot 
Moja preporaka e da se koristi azure bazata koja ke bide dostapna uste nekoj period(Dur ne se potrosi studentskiot kredit koj e doelen od strana na Microsoft Azure na studentite od finki).

Vo drug terminal startuvajte ja Anuglar front end aplikacijata so slednive komandi
`npm install`
`npm start`

na localhost:4200 ke ja najdete aplikacijata cams kade ke Vi bidat pobarani username i password za najava. 
Koristete go sledniov admin user za testiranje na aplikacijata:
username: cams
password: admin

Za potrebite na ovaa aplikacia vo ova repository ima API key od Google API koj sega e javno dostapen site. 
Po zavrsuvanjeto so obvrskite za ovoj predmet toj API key ke bide isklucen preku Google Api konzolata.

