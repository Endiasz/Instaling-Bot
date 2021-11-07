///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Loading all data

///////////////////////////////////////////////////
///////////////////////////////////////////////////


var translations = inputTranslations();
var newWrods = [];
var numbOfNewW = 0;
var powt = 0;

// laod bellow
var errorsPerRun = parseInt(prompt("Podaj liczbę błędó", 3));
var iloscPowtorzen = parseInt(prompt("Podaj ilość powtóżeń", 50));

if (!(errorsPerRun >= 0)) {
    var errorsPerRun = 3;
}

if (!(iloscPowtorzen > 0)) {
    var iloscPowtorzen = 50;
}

// main loop

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



    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    //              One time Cases

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    if (sesresult.innerHTML != "") {
        console.error("Koniec zadań na dzisiaj. Wyłączam bota. Miłego dnia");
        stopTheLoop();
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

    if (speaker.style.display != "none") { // Answear page

        if (checkTranslations(toTranslate, translations)) {  // Knowed Word
            // console.log("Answear page");

            console.log("Znam słowo");

            setTimeout(() => {
                const btn2 = document.querySelector("#nextword");
                // console.log("nextword");
                btn2.click()
            }, Math.random() * 1000 + 2000);

        } else {   // Unknowed Word, learn

            // console.log("Answear page");

            translations = answearLearn(word, toTranslate, translations);
            newWrods[toTranslate] = word;
            numbOfNewW++;
            console.log("Nowe słówko");

            setTimeout(() => {
                const btn2 = document.querySelector("#nextword");
                // console.log("nextword");
                btn2.click();
            }, Math.random() * 1000 + 2000);

        }

    } else if (speaker.style.display == "none") { // Question page

        if (checkTranslations(toTranslate, translations) && isError) {  // generate mistake
            errorsPerRun--;
            console.log("Intencjonalny błąd")

            var temp = generateString(toTranslate);

            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                btn1.click()
            }, delay);
            return;

        } else if (checkTranslations(toTranslate, translations)) {  // Do when Word is known 

            var temp = chcechForAnswear(toTranslate, translations);

            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                btn1.click()
            }, delay);
        } else {
            // console.log("Question page");

            if (checkTranslations(toTranslate, translations)) {

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


    } else {
        console.error("Coś tu się odkurwiło !? XDDD");
    }
}



///////////////////////////////////////////////////
///////////////////////////////////////////////////

//              Main calling

///////////////////////////////////////////////////
///////////////////////////////////////////////////

var TheLoopInterval = setInterval(() => {
    if (Math.round(Math.random() * 6) == 1 && errorsPerRun > 0 && powt < iloscPowtorzen) {

        // if (powt < iloscPowtorzen) {
        doIt(true); // wykonaj wszystko
        powt++
    } else if (powt < iloscPowtorzen) {

        // if (powt < iloscPowtorzen) {
        doIt(); // wykonaj wszystko
        powt++
    }
    else {

        console.log("Zrobiłem powtóżenia");
        stopTheLoop();
    }

}, 11000);

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
        return Math.round(Math.random() * 2000 + 3000);
    else if (count < 10)
        return Math.round(Math.random() * 2000 + 6000);
    else if (count < 15)
        return Math.round(Math.random() * 2000 + 7000);
    else
        return Math.round(Math.random() * 2000 + 8000);

}


