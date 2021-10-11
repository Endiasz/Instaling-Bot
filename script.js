var translations = inputTranslations();

var errorsPerRun = 3;
var iloscPowtorzen = 50; // + errorperrun
var powt = 0;

// main loop

function doIt(isError = false) {

    var newWord = document.querySelector("#new_word_form");


    var toTranslate = document.querySelector("div.translations").innerHTML;
    var answer = document.querySelector("#answer");
    var delay = countDelay(toTranslate);
    var sesresult = document.querySelector("#session_result");

    if (sesresult.innerHTML != "") {
        console.error("Koniec zadań na dzisiaj");
        return;
    }

    const btn = document.querySelector("#check");

    var word = document.querySelector("#word").innerHTML;
    var speaker = document.querySelector(".speaker");

    // Sprawdź czy jest strona new word
    if (newWord.style.display != "none") {
        console.log("Pomijam słówko");
        document.querySelector("#dont_know_new").click();
        setTimeout(() => {
            document.querySelector("#skip").click();
        }, 1000);
        return;
    }



    if (speaker.style.display != "none") {
        // console.log("Answear page");

        if (checkTranslations(toTranslate, translations)) {
            console.log("Znałem słowo");
        } else {
            translations = answearLearn(word, toTranslate, translations);
        }

        setTimeout(() => {
            const btn2 = document.querySelector("#nextword");
            // console.log("nextword");
            btn2.click()
        }, Math.random() * 1000 + 2000);

    } else {
        // console.log("Question page");

        if (checkTranslations(toTranslate, translations)) {

            if (isError)
                var temp = generateString(toTranslate);
            else
                var temp = chcechForAnswear(toTranslate, translations);

            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                // console.log("check");
                btn1.click()
            }, delay);

        } else {
            console.log("randomowy string");
            answer.value = generateString(toTranslate);
            answer.placeholder = answer.value;

            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                // console.log("check");
                btn1.click()
            }, delay);
        }
    }
}

//  TUTAJ OGÓŁEM MASZ PENTLĘ KTORĄ SIĘ SAMA WYKONUJE 

setInterval(() => {

    if (Math.round(Math.random()) && errorsPerRun < 0 && powt < iloscPowtorzen) {

        // if (powt < iloscPowtorzen) {
        doIt(true); // wykonaj wszystko
        console.log("Intencjonalny błąd")
        errorsPerRun--;
        powt++
    } else if (powt < iloscPowtorzen) {

        // if (powt < iloscPowtorzen) {
        doIt(); // wykonaj wszystko
        powt++
    }
    else
        console.log("Zrobiłem powtóżenia");

}, 11000);

//  TUTAJ JUŻ KONIEC TEJ PĘTLI


// Functions


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
        else console.error("Błąd (pozyskania słowa PL)");
    } else
        console.error("Błąd (pozyskania słowa DE)");

    return translations;
}


function chcechForAnswear(toTranslate, translations) { //poszukaj odpowiednego słowa w zasobniku
    var isDone = false;

    if (toTranslate != undefined) {
        if (translations != undefined) {

            for (var key in translations) {
                var value = translations[key];

                if (key == toTranslate) {
                    console.log("I got it boyyy");
                    return value;
                }
            }

            if (isDone == false) {
                //answearLern(toTranslate, translations)
                console.error("Nieznane słowo a powinienem je zanc 😮");
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
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = "";
    if (txtToLenght < 3) {
        txtToLenght = 5;
    }

    for (var i = 0; i < (txtToLenght.length + Math.random() * 5 + -3); i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateString(txtToLenght) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = "";
    if (txtToLenght < 3) {
        txtToLenght = 5;
    }

    for (var i = 0; i < (txtToLenght.length + Math.random() * 5 + -3); i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function endForToday(translations) { // wypisz cały zasobnik słów jako JSON
    console.log(JSON.stringify(translations));
    alert("Masz chwilę na skopiowanie słownika z konsoli");
}

function haltuj(translations) {
    alert(translations);
}


function inputTranslations() {
    // var translations = prompt()
    var translationsToAssing = prompt("Podaj słownik słowa w odpowiednim formacie", "");
    if (translationsToAssing != '') {
        translations = JSON.parse(translationsToAssing);
        return translations;
    } else return {};
}

function countDelay(toTranslate) {
    var minDelay = 3000;
    var count = 0;
    for (var key in toTranslate) {
        count++;
    }

    if (count < 6)
        return Math.round(Math.random() * 2000 + minDelay);
    else if (count < 10)
        return Math.round(Math.random() * 2000 + (minDelay + 3000));
    else if (count < 15)
        return Math.round(Math.random() * 2000 + (minDelay + 4000));
    else
        return Math.round(Math.random() * 2000 + (minDelay + 5000));

}
