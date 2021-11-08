console.log("Baclground is working xD")

chrome.browserAction.onClicked.addListener(buttonClicked);

var translations;

function buttonClicked(tab) {
    let msg = {
        txt: "Hello"
    }
    chrome.tabs.sendMessage(tab.id, msg)
}