///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Declarate all varibles

///////////////////////////////////////////////////
///////////////////////////////////////////////////

const container = document.querySelector(".container")
const showWords = document.querySelector(".showTranslations");
const loopStart = document.querySelector(".startBot");
const loopStop = document.querySelector(".stopBot");
const logElement = document.querySelector(".logs")

///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Basic logic

///////////////////////////////////////////////////
///////////////////////////////////////////////////

if (words === undefined) {
    var words = {}
    getWords()
}
if (words === {}) {
    // dodaj tłumaczenia
    console.log("dodaj tłumacznenia")
    words = inputTranslations();
}

if (localStorage = {}) {
    //saveTranslations(words)
}



///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Different usefull functions

///////////////////////////////////////////////////
///////////////////////////////////////////////////

function getWords() {
    for (ele in localStorage) {
        if (typeof (localStorage[ele]) !== typeof ({})) {
            words[ele] = localStorage[ele];
        }
    }
}

function saveTranslations(trans) {
    for (ele in trans) {
        localStorage[ele] = trans[ele]

    }
}
// saveTranslations(words)

function inputTranslations() {
    var translationsToAssing = prompt("Podaj słownik słowa w odpowiednim formacie", "");
    if (translationsToAssing != '') {
        translations = JSON.parse(translationsToAssing);
        return translations;
    } else {
        return {};
    }
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Main logic

///////////////////////////////////////////////////
///////////////////////////////////////////////////
var isShowingWords = false;

showWords.addEventListener("click", () => {
    if (!isShowingWords) {

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
    isShowingWords = !isShowingWords;
})

chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(message, sender, sendResponse) {
    if (message.desire === undefined) {
    }
    if (message.isTranslaation == "inputTranslation") {
        // message.translations = sendResponse;
    }
}

loopStart.addEventListener('click', btnStart)
function btnStart() {

    console.log("Start bot");
    logElement.innerHTML += "Start bot<br>";

    chrome.tabs.query({}, gotTabs)
    function gotTabs(tabs) {

        for (ele in tabs) {
            if (tabs[ele].url.indexOf("https://instaling.pl/ling2/html_app/") != -1) {
                var tabOfInstaling = tabs[ele];
                var foundInstsaling = true;

                // At this point there is found tab and ready to use as tabOfInstaling (Object)

                let msg = {
                    active: true,
                    sendWords: translations
                }
                chrome.tabs.sendMessage(tabOfInstaling.id, msg)
            }
        }

        if (foundInstsaling != true) {
            console.log("Something wrong");
            logElement.innerHTML += "Something wrong<br>";
            return;
        }
    }
}

loopStop.addEventListener('click', btnStop)
function btnStop() {

    console.log("Stop bot");
    logElement.innerHTML += "Stop bot<br>";

    chrome.tabs.query({}, gotTabs)
    function gotTabs(tabs) {

        for (ele in tabs) {
            if (tabs[ele].url.indexOf("https://instaling.pl/ling2/html_app/") != -1) {
                var tabOfInstaling = tabs[ele];
                var foundInstsaling = true;

                // At this point there is found tab and ready to use as tabOfInstaling (Object)

                console.log(tabOfInstaling);

                let msg = { active: false }
                chrome.tabs.sendMessage(tabOfInstaling.id, msg)
            }
        }

        if (foundInstsaling != true) {
            console.log("Something wrong");
            logElement.innerHTML += "Something wrong<br>";
            return;
        }
    }
}