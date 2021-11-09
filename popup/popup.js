const container = document.querySelector(".container")
const showWords = document.querySelector(".showTranslations");
const loopStart = document.querySelector(".startBot");
const loopStop = document.querySelector(".stopBot");
const logElement = document.querySelector(".logs")

var words =
    { "rękawica": "der Handschuh", "miejsce zamieszkania": "der Wohnort", "skarpetka": "die Socke", "kapelusz": "der Hut", "nazwisko": "der Familienname", "miejsce urodzenia": "der Geburtsort", "krawat": "die Krawatte", "wiek": "das Alter", "żonaty, zamężna": "verheiratet", "pasek": "der Gürtel", "kurtka, marynarka, żakiet": "die Jacke", "płeć": "das Geschlecht", "koszula": "das Hemd", "nieżonaty, niezamężna": "ledig", "garnitur": "der Anzug", "spodnie": "die Hose", "czapka": "die Mütze", "imię": "der Vorname", "data urodzenia": "das Geburtsdatum", "zawód (profesja)": "der Beruf", "Morze Śródziemne": "das Mittelmeer", "góry": "das Gebirge", "Morze Bałtyckie": "die Ostsee" }


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
    if (message.isTranslaation == "inputTranslation") {
        message.translations = sendResponse;
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

                let msg = { active: true }
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