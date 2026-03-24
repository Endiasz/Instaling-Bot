
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // 🔹 ZAPIS SŁÓWEK
    if (message.type === 'saveWords') {
        chrome.storage.local.get(["words"], (result) => {
            const existing = result.words || {};
            const updated = { ...existing, ...message.data };

            chrome.storage.local.set({ words: updated }, () => {
                console.log("Zapisano słowa do storage");
                sendResponse({ status: "ok" });
            });
        });

        return true;
    }

    // 🔹 POBIERANIE SŁÓWEK
    if (message.type === 'getWords') {
        chrome.storage.local.get(["words"], (result) => {
            sendResponse({ words: result.words || {} });
        });

        return true;
    }
});

