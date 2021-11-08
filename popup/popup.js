const container = document.querySelector(".container")
const showWords = document.querySelector(".showTranslations");
const loopStart = document.querySelector(".startBot");
const loopStop = document.querySelector(".stopBot");

var words = {
    'honker': 'pojazd',
    'maslo': 'jedzenie',
    'kebab': 'jedzenie',
    'hunda': 'pojazd'
}
var clicked = false;

// clicked button to show words

showWords.addEventListener("click", () => {
    if (!clicked) {

        for (var ele in words) {
            var val = words[ele];
            console.log(ele, "\tto\t", val);
            const newDiv = document.createElement("div");
            newDiv.classList.add("element");
            container.appendChild(newDiv);
            newDiv.innerHTML = val + "\t:\t" + ele;
        }
    } else {
        const childs = document.querySelectorAll(".element");
        for (var i = 0; i < childs.length; i++) {
            container.removeChild(childs[i]);
        }

    }
    clicked = !clicked;

})


function saveTranslations(trans) {
    for (ele in trans) {
        var val = trans[ele];
        localStorage.setItem(ele, val);
    }
}

saveTranslations(words)


chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(message, sender, sendResponse) {
    if (message.desire === undefined) {
        console.log("Mam wiadomość ale bez przeznaczenia")
    }
    if (message.desire == "inputTranslation") {
        message.translations = sendResponse;
    }
}

loopStart.addEventListener(() => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, () => {
        console.log(tabs)
    })
    let msg = {
        txt: "Hello"
    }
    chrome.tabs.sendMessage(tab.id, msg)
})
