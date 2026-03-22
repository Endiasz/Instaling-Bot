///////////////////////////////////////////////////
///////////////////////////////////////////////////

//             Loading all data

///////////////////////////////////////////////////
///////////////////////////////////////////////////

// var translations = inputTranslations();
var translations = [];
var newWords = [];
var numbOfNewW = 0;
var powt = 0;

// load bellow
var errorsPerRun = -1;

function doIt(isError = false) {



    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              Get all elements

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////


    var newWord = document.querySelector("#new_word_form");
    var toTranslate = document.querySelector("#question > div.word_data > div.translation").innerHTML;
    var answer = document.querySelector("#answer");
    var delay = countDelay(toTranslate);
    var sesresult = document.querySelector("#session_result");
    var continueSesion = document.querySelector("#continue_session_page");
    var continueSesionBtn = document.querySelector("#continue_session_button");
    var startSesion = document.querySelector("#start_session_page");
    var startSesionBtn = document.querySelector("#start_session_button");
    var word = document.querySelector("#word").innerHTML;
    var speaker = document.querySelector("#answer_page");
    var isLoading = document.querySelector("#loading")



    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              Check all elements

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    // if (newWord == undefined) {
    //     consol.error("Błąd pobierania elementu")
    //     return;
    // }
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
    }

    if (startSesion.style.display != "none") {
        console.log("Start sesion page")
        startSesionBtn.click();
        return;
    }

    if (sesresult.innerHTML != "") {
        console.log("Koniec zadań na dzisiaj. Wyłączam bota. Miłego dnia");
        endForToday(translations, newWords);
        stopTheLoop();
        return;
    }

    if (newWord.style.display != "none") {
        // Sprawdź czy jest strona new word
        console.log("Pomijam słówko");
        document.querySelector("#dont_know_new").click();
        setTimeout(() => {
            //document.querySelector("#possible_word").click() // Testowanie in progres
            document.querySelector("#skip").click();
        }, 100);
        return;
    }

    if (isLoading.style.display != 'none') {

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
            }, 100);
        } else {   // Unknowed Word, learn

            translations = answearLearn(word, toTranslate, translations);
            newWords[toTranslate] = word;
            numbOfNewW++;
            console.log("Nowe słówko");
            setTimeout(() => {
                document.querySelector("#nextword").click();
                // console.log("nextword");
            }, 100);
        }
    } else if (speaker.style.display === '' || speaker.style.display === 'none') { // Question page

        if (checkTranslations(toTranslate, translations) && isError) {  // generate mistake
            errorsPerRun--;
            console.log("Intencjonalny błąd")
            var temp = makeMistake(toTranslate, true);

            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                document.querySelector("#check").click();
                // console.log("check");
            }, 100);

        } else if (checkTranslations(toTranslate, translations)) {  // Do when Word is known 

            var temp = chcechForAnswear(toTranslate, translations);
            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                document.querySelector("#check").click();
                // console.log("check");
            }, 100);
        } else {

            if (checkTranslations(toTranslate, translations)) {

            } else {
                console.log("Nie znam, uzupełniam");
                answer.value = makeMistake(toTranslate, false);
                answer.placeholder = answer.value;

                setTimeout(() => {
                    document.querySelector("#check").click();
                    // console.log("check");
                }, 100);
            }
        }
    } else {
        console.error("Coś tu się odkurwiło !? XDDD");
    }
}



///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Main loop

///////////////////////////////////////////////////
///////////////////////////////////////////////////

var TheLoopInterval = setInterval(theLoopFunction(), 5000);
function theLoopFunction() {

    if (Math.round(Math.random() * 6) == 1 && errorsPerRun > 0) {
        doIt(true); // wykonaj z błędem obsługa ilości błędów w funkcij
        powt++
    } else {
        doIt(); // wykonaj wszystko bez błędu
        powt++
    }

}
//  TUTAJ JUŻ KONIEC TEJ PĘTLI

///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              More usefull functions

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

function chcechForAnswear(toTranslate, translations) { // poszukaj odpowiednego słowa w zasobniku zwraca słowo
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

function checkTranslations(toTranslate, translations) { // sprawdź czy mamy takie słowo zwraca true albo false
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

function generateString(txtToLenght) { // generuje randomowy ciąg znaków z podanej długości stringa, przymuje stringa i zwraca wynik - string
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

function makeMistake(toTranslate, isIntentional = false) { // generuje intencjonalny błąd, odpowiedznio przemienia słówko w je zwraca
    var toReturn = "";
    if (isIntentional) {
        toReturn = chcechForAnswear(toTranslate, translations)
        toReturn = toReturn.slice(0, toReturn.length - 3)
        // alert("Intencjonalny błąd " + toTranslate);
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

function endForToday(translations, newWordss) { // wypisz cały zasobnik słów jako JSON do elementu
    if ((newWordss != [] ) ) {
        console.log("Są nowe słówka", numbOfNewW);

        // console.log(typeof newWordss)
        // console.log(typeof translations)


        // document.querySelector("#session_result > p").innerHTML = "<p> Nowe słowa skopiuj sobie je i dodaj za pomocą dodaj słowa</p><br>"
        // var temp = JSON.stringify(newWordss);
        // temp = temp.trim();
        // temp = temp.replace('{', '')
        // temp = temp.replace('}', '')
        // document.querySelector("#session_result > p").innerHTML += temp;
        // console.log(temp)
        // console.log(newWordss)
        // // console.log(newWordss)

        // Kurda jego mać nie mam pojęcia czemu nie działa...

        document.querySelector("#session_result > p").innerHTML += "<br><p> Wszystkie słówka </p><br>"
        var temp = JSON.stringify(translations);
        temp = temp.trim();
        temp = temp.replace('{', '')
        temp = temp.replace('}', '')
        document.querySelector("#session_result > p").innerHTML += temp;
        console.log(temp)
        console.log(translations)   
    } else {
        console.log("Brak nowych słówek");

        document.querySelector("#session_result > p").innerHTML = "<p> Brak nowych słówek </p><br>"
        document.querySelector("#session_result > p").innerHTML += JSON.stringify(translations);
        // document.querySelector("#session_result > p").innerHTML += "<br><p> Tablica nowych słówek </p><br>"
        // document.querySelector("#session_result > p").innerHTML += JSON.stringify(newWrods);
        console.log(JSON.stringify(translations));
    }
    //console.log(JSON.stringify(translations));

    //let wordsToSend = translations;
    sendWordsToBackground(translations);
    console.log(translations);
    console.log("Wysłałem dane do background");
    //alert("Masz chwilę na skopiowanie słownika z konsoli");
}

function stopTheLoop() {
    clearInterval(TheLoopInterval)
}

function inputTranslations() {
    var translationsToAssing = prompt("Podaj słówka w odpowiednim formacie(skopiowany tekst w formacie JSON nie żadna nazwa pliku)", "");
    if (translationsToAssing != '') {
        translations = JSON.parse(translationsToAssing);
        return translations;
    } else return '{}';
}

function countDelay(toTranslate) { // w sumie to jest do usuniecia 
    var count = 0;
    for (var key in toTranslate) {
        count++;
    }
    return Math.round(Math.random() * 300 + 3200);
}

// Wysyłanie danych do background.js
function sendWordsToBackground(words) {
    chrome.runtime.sendMessage({
        type: 'saveWords',
        data: words
    });
}



// Bot side of the project

chrome.runtime.onMessage.addListener(gotMesssage); // Jeżeli otrzymasz wiadomość to wykonaj gotMessage

function gotMesssage(request, sender, sendResponse) {

    if (request.desire === undefined) {

    } else if (request.translations !== undefined) {
        translations = request.translations;
    }

    if (request.active === undefined) {

    } else if (request.active === true) {


        clearInterval(TheLoopInterval);
        translations = request.sendWords;
        errorsPerRun = request.errorsPerRun;
        var timeBetween = request.timeBetween;
        TheLoopInterval = setInterval(theLoopFunction, timeBetween)
        console.log("Started bot")

    } else if (request.active === false) {
        stopTheLoop(TheLoopInterval);
        console.log("Stoped bot")
    }


}



