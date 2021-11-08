console.log("Script go")

chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(message, sender, sendResponse) {

    if (message.destination === undefined) {
        return;
    }

    if (message.destination === "getTranslations") {
        sendResponse(translations)
    }
}

