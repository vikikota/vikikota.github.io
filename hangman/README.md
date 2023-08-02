# hangman
Teamwork - Project hangman

Akasztófa

Az akasztófa játékban a játék indulása után egy random kiválasztott szót kell kitalálni, úgy, hogy betükre lehet tippelni és ha a betüt tartalmazza a szó, akkor folytathatja a tippelést, ha nem tartalmazza, akkor hibapontot gyűjt és bizonyos hibapont után vége a játéknak. A játék akkor ad pozitív kimenetelt, ha a szót kitaláltuk a maximális hibapont elérése előtt, vagy a hibáink száma eléri a maximális hibapontot amikor is a szót nem sikerült kitalálni, de többet már nem próbálkozhatunk.
Itt a következők megvalósítása a csapat dontése:

    mennyi a maximális hibapont (pl. a szó hosszának 20%-a) // ok
    a szavak milyen adatbázisból jönnek (pl. nyilvános magyar szótár API) // lokális először
    hogyan jelezzük a hibapontokat. Minél látványosabb annál jobb. // szívecskék
    tároljuk-e az eredményeket vagy sem // igen, localStorage is és JSON-szerveren
    akasztófa kirajzolása van-e // igen, div-ekkel
    a helyes betüért kap-e plusz pontot, ergo van-e pontozás a játékban // hard work
