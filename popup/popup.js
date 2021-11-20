///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Declarate all varibles

///////////////////////////////////////////////////
///////////////////////////////////////////////////

const container = document.querySelector(".container")
const showWords = document.querySelector(".showTranslations");
const loopStart = document.querySelector(".startBot");
const loopStop = document.querySelector(".stopBot");
const logElement = document.querySelector(".logs");
const addWordsBtn = document.querySelector(".addTranslations");
const deleteWordsBtn = document.querySelector(".deleteTranslations");

///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Basic logic

///////////////////////////////////////////////////
///////////////////////////////////////////////////

if (localStorage.haveTranslations === undefined) {
    saveTranslations(inputTranslations());
    // localStorage = inputTranslations();
}

if (words === undefined) {
    var words = {}
    getWords()
}





///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Different usefull functions

///////////////////////////////////////////////////
///////////////////////////////////////////////////

function coppyToClibord(element) {
    if (element !== undefined) {
        var copyText = element;
        //navigator.clipboard.writeText(copyText);
        logElement.innerHTML += "Skopiowałem <br>";
    }
}

function getWords() { // to internal varrible witchout any retardet
    for (ele in localStorage) {
        if (typeof (localStorage[ele]) !== typeof (() => { })) {
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
    if (translationsToAssing != "") {
        translations = JSON.parse(translationsToAssing);
        translations.haveTranslations = true;
        logElement.innerHTML += "Dodałeś słówka<br>";
        return translations;
    } else {
        console.log("Nic nie podałeś");
        logElement.innerHTML += "Nie podaleś żadnych słówek<br>";
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
            // console.log(ele, "\tto\t", val);
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
    if (!isShowingWords) {

        var elementList = document.querySelectorAll("div.container.words > div");
        for (ele in elementList) {
            if (elementList[ele].innerHTML !== undefined && elementList[ele].innerHTML !== null) {
                elementList[ele].addEventListener('click', coppyToClibord(elementList[ele].innerHTML));
            }
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

    // console.log("Start bot");

    chrome.tabs.query({}, gotTabs)
    function gotTabs(tabs) {
        for (ele in tabs) {
            if (tabs[ele].url.indexOf("https://instaling.pl/ling2/html_app/") != -1) {
                var tabOfInstaling = tabs[ele];
                var foundInstsaling = true;

                // At this point there is found tab and ready to use as tabOfInstaling (Object)
                logElement.innerHTML += "Start bot<br>";

                let msg = {
                    active: true,
                    sendWords: words
                }
                chrome.tabs.sendMessage(tabOfInstaling.id, msg)
            }
        }

        if (foundInstsaling != true) {
            // console.log("Something wrong");
            logElement.innerHTML += "Something wrong no instaling<br>";
            return;
        }
    }
}

loopStop.addEventListener('click', btnStop)
function btnStop() {


    chrome.tabs.query({ currentWindow: true }, gotTabs)
    function gotTabs(tabs) {

        for (ele in tabs) {
            if (tabs[ele].url.indexOf("https://instaling.pl/ling2/html_app/") != -1) {
                var tabOfInstaling = tabs[ele];
                var foundInstsaling = true;

                // At this point there is found tab and ready to use as tabOfInstaling (Object)

                logElement.innerHTML += "Stop bot<br>";
                // console.log(tabOfInstaling);

                let msg = { active: false }
                chrome.tabs.sendMessage(tabOfInstaling.id, msg)
            }
        }

        if (foundInstsaling != true) {
            console.log("Something wrong");
            logElement.innerHTML += "Something wrong no instaling<br>";
            return;
        }
    }
}

addWordsBtn.addEventListener('click', btnAddWords);
function btnAddWords() {
    saveTranslations(inputTranslations());
}

deleteWordsBtn.addEventListener('click', btnDeleteWords);
function btnDeleteWords() {
    localStorage.clear();
}
