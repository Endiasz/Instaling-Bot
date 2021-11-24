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
var inputErrors = document.querySelector("#numbOfError");
var timeBetween = document.querySelector("#timeBetween");

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

function getWords() { // to internal variable without any retardet
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
    var translationsToAssing = prompt('Podaj słownik słów (skopiowany tekst w (np "miejsce zamieszkania":"der Wohnort")', '');
    if (translationsToAssing != "" && translationsToAssing !== null) {
        // Dodaj { i } dzięki czemu nie ma tego pierdzielenie się z tym i samo sobie bez tego radzi 
        translationsToAssing = translationsToAssing.trim(); // dla pewności że nie ma znaku białego
        translationsToAssing = '{' + translationsToAssing; // taki pushback ale dla debili
        translationsToAssing += '}'; // dodaj na koniec

        translations = JSON.parse(translationsToAssing);
        translations.haveTranslations = true;
        logElement.innerHTML += "Dodałeś słówka<br>";
        return translations;
    } else {
        console.log("Nic nie podałeś");
        logElement.innerHTML += "Nie podałeś żadnych słówek<br>";
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
    isShowingWords = !isShowingWords;
})

chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(message, sender, sendResponse) {
    if (message.desire === undefined) {
    }
    if (message.isTranslaation == "inputTranslation") {
        // message.translations = sendResponse; ?
    }
}


loopStart.addEventListener('click', btnStart)
function btnStart() {

    // console.log("Start bot");

    chrome.tabs.query({ currentWindow: true }, gotTabs)
    function gotTabs(tabs) {
        for (ele in tabs) {
            if (tabs[ele].url.indexOf("https://instaling.pl/ling2/html_app/") != -1) {
                var tabOfInstaling = tabs[ele];
                var foundInstsaling = true;

                // At this point there is found tab of instaling and ready to use as tabOfInstaling (Object)
                logElement.innerHTML += "Start bota<br>";
                if (inputErrors == 'null' || inputErrors === undefined) {
                    var errors = inputErrors.value;
                } else {
                    var errors = 3;
                }

                if (timeBetween == 'null' || timeBetween == undefined || timeBetween.value == undefined || timeBetween.value == 'null') {
                    if (timeBetween.value < 4) {
                        var time = 4000;
                    }
                    var time = timeBetween.value * 1000;
                } else {
                    var time = 4000
                }

                let msg = {
                    active: true,
                    sendWords: words,
                    errorsPerRun: errors,
                    timeBetween: time
                }
                chrome.tabs.sendMessage(tabOfInstaling.id, msg)
            }
        }

        if (foundInstsaling != true) {
            // console.log("Something wrong");
            logElement.innerHTML += "Nie znalazłem okienka instalinga <br>";
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

                // At this point there is found tab of instaling and ready to use as tabOfInstaling (Object)

                logElement.innerHTML += "Stop bota<br>";
                // console.log(tabOfInstaling);

                let msg = { active: false }
                chrome.tabs.sendMessage(tabOfInstaling.id, msg)
            }
        }

        if (foundInstsaling != true) {
            console.log("Something wrong");
            logElement.innerHTML += "Nie znalazłem okienka instalinga<br>";
            return;
        }
    }
}

addWordsBtn.addEventListener('click', btnAddWords);
function btnAddWords() {
    saveTranslations(inputTranslations());
    getWords();
}

deleteWordsBtn.addEventListener('click', btnDeleteWords);
function btnDeleteWords() {
    localStorage.clear();
}



