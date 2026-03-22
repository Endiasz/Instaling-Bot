let savedWords = {};
var havewords = false

// background.js

// Pobierz informacje z manifest.json
const manifest = chrome.runtime.getManifest();
const expectedAuthor = "Endiasz";  // Twój poprawny autor

// Sprawdź, czy autor jest zgodny
if (manifest.author !== expectedAuthor) {
    console.error("Nieautoryzowana wersja rozszerzenia! Skrypt zostaje zatrzymany.");

    // Zatrzymanie dalszego działania poprzez wyrzucenie błędu
    throw new Error("Nieautoryzowana wersja rozszerzenia!");
} else {
    console.log("Autor poprawny, skrypt działa dalej.");
    // Możesz kontynuować działanie dalszych funkcji, jeśli autor jest poprawny
}

// Listener dla wiadomości z content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'saveWords') {
        savedWords = message.data;
        havewords= true
    }
});

// Funkcja, która zwraca zapisane słówka dla popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getWords') {
            // sendResponse({ words: savedWords });
            // havewords=false
            // savedWords = {};
        if(savedWords.length >= 0){
            sendResponse({ words: savedWords });
            havewords=false
            savedWords = {};
        }
        else{
            sendResponse("Brak");
        }
        }
});