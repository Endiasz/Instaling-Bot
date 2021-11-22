///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Loading all data

///////////////////////////////////////////////////
///////////////////////////////////////////////////

// var translations = inputTranslations();
var translations = {};
var newWrods = [];
var numbOfNewW = 0;
var powt = 0;

// laod bellow
var errorsPerRun = -1;


function doIt(isError = false) {

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              Get all elements

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    var newWord = document.querySelector("#new_word_form");
    var toTranslate = document.querySelector("div.translations").innerHTML;
    var answer = document.querySelector("#answer");
    var delay = countDelay(toTranslate);
    var sesresult = document.querySelector("#session_result");
    var continueSesion = document.querySelector("#continue_session_page");
    var continueSesionBtn = document.querySelector("#continue_session_button");
    var startSesion = document.querySelector("#start_session_page");
    var startSesionBtn = document.querySelector("#start_session_button");
    var word = document.querySelector("#word").innerHTML;
    var speaker = document.querySelector("#answer_page");


    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              Check all elements

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    if (newWord == undefined) {
        consol.error("Błąd pobierania elementu")
        return;
    }
    if (toTranslate == undefined) {
        consol.error("Błąd pobierania elementu")
        return;
    }


    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              One time Cases

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////



    if (continueSesion.style.display != "none") {
        console.log("Continue sesion page")
        continueSesionBtn.click();
        return;
    } else if (startSesion.style.display != "none") {
        console.log("Start sesion page")
        startSesionBtn.click();
        return;
    } else if (sesresult.innerHTML != "") {
        console.log("Koniec zadań na dzisiaj. Wyłączam bota. Miłego dnia");
        endForToday(translations, newWord);
        stopTheLoop();
        return;
    } else if (newWord.style.display != "none") {
        // Sprawdź czy jest strona new word
        console.log("Pomijam słówko");
        document.querySelector("#dont_know_new").click();
        setTimeout(() => {
            //document.querySelector("#possible_word").click() // Testowanie in progres
            document.querySelector("#skip").click();
        }, 1000);
        return;
    }

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              Main logic MAGIC

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////


    if (speaker.style.display == 'block') { // Answear page

        if (checkTranslations(toTranslate, translations)) {  // Knowed Word
            console.log("Znam słowo");

            setTimeout(() => {
                document.querySelector("#nextword").click();
                // console.log("nextword");
            }, 2000);
        } else {   // Unknowed Word, learn

            translations = answearLearn(word, toTranslate, translations);
            newWrods[toTranslate] = word;
            numbOfNewW++;
            console.log("Nowe słówko");
            setTimeout(() => {
                document.querySelector("#nextword").click();
                // console.log("nextword");
            }, 2000);
        }
    } else if (speaker.style.display === '' || speaker.style.display === 'none') { // Question page

        if (checkTranslations(toTranslate, translations) && isError) {  // generate mistake
            errorsPerRun--;
            console.log("Intencjonalny błąd")
            var temp = (toTranslate, true);

            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                document.querySelector("#check").click();
                // console.log("check");
            }, 2000);

        } else if (checkTranslations(toTranslate, translations)) {  // Do when Word is known 

            var temp = chcechForAnswear(toTranslate, translations);
            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                document.querySelector("#check").click();
                // console.log("check");
            }, 2000);
        } else {
            // console.log("Question page");

            if (checkTranslations(toTranslate, translations)) {

            } else {
                // console.log("randomowy string");
                // nie znam słowa
                console.log("Nie znam, usupełniam");

                answer.value = makeMistake(toTranslate, false);
                answer.placeholder = answer.value;

                setTimeout(() => {
                    document.querySelector("#check").click();
                    // console.log("check");
                }, delay);
            }
        }
    } else {
        console.error("Coś tu się odkurwiło !? XDDD");
    }
}






///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Main calling

///////////////////////////////////////////////////
///////////////////////////////////////////////////



var firstLoop = true;

var TheLoopInterval = setInterval(theLoopFunction(), 5000);
function theLoopFunction() {
    if (firstLoop) {
        firstLoop = false;
        stopTheLoop();
    } else if (Math.round(Math.random() * 6) == 1 && errorsPerRun > 0) {
        doIt(true); // wykonaj wszystko
        powt++
    } else {

        doIt(); // wykonaj wszystko
        powt++
    }

}
//  TUTAJ JUŻ KONIEC TEJ PĘTLI

///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Diferent usefull functions

///////////////////////////////////////////////////
///////////////////////////////////////////////////



function answearLearn(word, toTranslate, translations) {  // jeżeli nie znasz naucz się
    // var word = document.querySelector("#word").innerHTML;

    if (word != undefined) {

        if (translations != undefined) {

            if (toTranslate != undefined) {

                translations[toTranslate] = word;
                console.log("Słowo nauczone");
                return translations;
            }
        }
        else console.error("Błąd ( pozyskania słowa PL )");
    } else
        console.error("Błąd ( pozyskania słowa DE )");

    return translations;
}

function chcechForAnswear(toTranslate, translations) { //poszukaj odpowiednego słowa w zasobniku
    var isDone = false;

    if (toTranslate != undefined) {
        if (translations != undefined) {

            for (var key in translations) {
                var value = translations[key];

                if (key == toTranslate) {
                    console.log("Uzupełniam słowo");
                    return value;
                }
            }

            if (isDone == false) {
                //answearLern(toTranslate, translations)
                console.error("Nieznane słowo a powinienem je zanć 😮");
            }
        } else console.error("chcechForAnswear (toTranslate undefined)");
    } else console.error("chcechForAnswear (translations undefined)");
}

function checkTranslations(toTranslate, translations) { // sprawdź czy mamy takie słowo 
    var isLerned = false;

    if (toTranslate != undefined) {

        if (translations != undefined) {

            for (var key in translations) {
                var value = translations[key];

                if (key == toTranslate) {
                    return true;
                }
            }

            if (isLerned == false) {
                return false;
            }
        } else
            console.error("Błąd (pozyskania zasobnika odpowiedzi)");

    } else
        console.error("Błąd (pozyskania słowa PL)");

    return false;
}

function generateString(txtToLenght) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    var result = "";
    if (txtToLenght < 3) {
        txtToLenght = 5;
    }

    for (var i = 0; i < (txtToLenght.length + Math.random() * 5 + -3); i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // return result;

    return toTranslate;
}

function makeMistake(toTranslate, isIntentional = false) {
    var toReturn = "";
    if (isIntentional) {
        toReturn = chcechForAnswear(toTranslate, translations)
        toReturn = toReturn.slice(0, toReturn.length - 3)

        return toReturn;
    }


    toReturn = toTranslate;
    if (toReturn.indexOf(",") != -1) {
        toReturn = toReturn.slice(toReturn.indexOf(",") + 1, toReturn.length)
        // console.log("Jest przecinek")
        return toReturn;
    } else {
        toReturn = toReturn.slice(0, toReturn.length - 3);
        // console.log("Brak przecinka")
        return toReturn;
    }
}

function endForToday(translations, newWord) { // wypisz cały zasobnik słów jako JSON
    if (newWord !== undefined && newWord !== 'null') {
        document.querySelector("#session_result > p").innerHTML = "<p> Nowe słowa skopiuj sobie je i dodaj za pomocą dodaj słowa</p>"
        document.querySelector("#session_result > p").innerHTML += JSON.stringify(newWord);
        document.querySelector("#session_result > p").innerHTML = "<p> Stare słówka </p>"
        document.querySelector("#session_result > p").innerHTML += JSON.stringify(translations);
    } else {
        document.querySelector("#session_result > p").innerHTML = "<p> Brak nowych słówek </p>"
        document.querySelector("#session_result > p").innerHTML += JSON.stringify(translations);
        document.querySelector("#session_result > p").innerHTML = "<p> Tablicz nowych słówek </p>"
        document.querySelector("#session_result > p").innerHTML += JSON.stringify(newWrods);
    }
    //console.log(JSON.stringify(translations));
    //alert("Masz chwilę na skopiowanie słownika z konsoli");
}

function stopTheLoop() {
    clearInterval(TheLoopInterval)
}

function inputTranslations() {
    var translationsToAssing = prompt("Podaj słownik słowa w odpowiednim formacie", "");
    if (translationsToAssing != '') {
        translations = JSON.parse(translationsToAssing);
        return translations;
    } else return '{}';
}

function countDelay(toTranslate) {
    var count = 0;
    for (var key in toTranslate) {
        count++;
    }

    if (count < 6)
        return Math.round(Math.random() * 2000 + 5000);
    else if (count < 10)
        return Math.round(Math.random() * 2000 + 5000);
    else if (count < 15)
        return Math.round(Math.random() * 2000 + 5000);
    else
        return Math.round(Math.random() * 2000 + 5000);

}

// Bot side of the project

chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(request, sender, sendResponse) {

    if (request.desire === undefined) {

    } else if (request.translations !== undefined) {
        // console.log("Got translations from popup")
        translations = request.translations;
    }

    if (request.active === undefined) {

    } else if (request.active === true) {


        clearInterval(TheLoopInterval);
        translations = request.sendWords;
        errorsPerRun = request.errorsPerRun;
        TheLoopInterval = setInterval(theLoopFunction, 11000)
        console.log("Started bot")

    } else if (request.active === false) {
        stopTheLoop(TheLoopInterval);
        console.log("Stoped bot")
    }


}



