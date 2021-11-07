console.log("Script go")

chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(message, sender, sendResponse) {
    console.log(message.txt);
}

