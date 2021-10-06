var translations = inputTranslations();
if (translations != typeof Object) {
    console.error("Błąd przy wczytywaniu danych");
    return;
}

var errorsPerRun = 3;
var iloscPowtorzen = 20;
var powt = 0;


// main loop

function doIt(isError = false) {
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

    // if (end!=undefined){
    //     return;
    // }

    if (isError) {

    }


    if (speaker.style.display != "none") {
        // console.log("Answear page");

        if (checkTranslations(toTranslate, translations)) {
            console.log("Znałem słowo");


        } else {
            translations = answearLearn(word, toTranslate, translations);
        }

        const btn2 = setTimeout(() => {
            const btn2 = document.querySelector("#nextword");
            btn2.click()
        }, Math.random() * 1000 + 500);

    } else {
        // console.log("Question page");

        if (checkTranslations(toTranslate, translations)) {
            var temp = chcechForAnswear(toTranslate, translations);
            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                btn1.click()
            }, delay);

        } else {
            console.log("randomowy string");

            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            var result = "";

            for (var i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            answer.value = result;
            answer.placeholder = result;

            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                btn1.click()
            }, delay);
        }
    }
}

//  TUTAJ OGÓŁEM MASZ PENTLĘ KTORĄ SIĘ SAMA WYKONUJE 
var iloscPowtorzen = 20;
var error

setInterval(() => {
    setTimeout(() => {
        if (Math.round(Math.random()) && errorsPerRun < 0) {

            if (powt < iloscPowtorzen)
                doIt(true); // wykonaj wszystko
            errorsPerRun--;
            powt++
        } else {
            if (powt < iloscPowtorzen)
                doIt(); // wykonaj wszystko
            powt++
        }
    }, 8500);
}, 9000);

//  TUTAJ JUŻ KONIEC TEJ PĘTLI MASZ


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


function endForToday(translations) { // wypisz cały zasobnik słów
    console.log(JSON.stringify(translations));
}

function haltuj(translations) {
    alert(translations);
}

function inputTranslations() {
    // var translations = prompt()
    var translationsToAssing = prompt("Podaj słownik słowa w odpowiednim formacie", "[tutaj słowa w odpowiednim formacie]");
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
    console.log(count);

    if (count < 6)
        return Math.round(Math.random() * 2000 + minDelay);
    else if (count < 10)
        return Math.round(Math.random() * 2000 + (minDelay + 3000));
    else if (count < 15)
        return Math.round(Math.random() * 2000 + (minDelay + 5000));
    else
        return Math.round(Math.random() * 2000 + (minDelay + 7000));

}