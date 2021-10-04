var translations = {};
// main loop

function doIt() {
    var toTranslate = document.querySelector("div.translations").innerHTML;
    var answer = document.querySelector("#answer");

    const btn = document.querySelector("#check");

    var word = document.querySelector("#word").innerHTML;
    var speaker = document.querySelector(".speaker");

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
        }, Math.random() * 2000 + 3000);

    } else {
        // console.log("Question page");

        if (checkTranslations(toTranslate, translations)) {
            var temp = chcechForAnswear(toTranslate, translations);
            answer.value = temp;
            answer.placeholder = temp;
            setTimeout(() => {
                const btn1 = document.querySelector("#check");
                btn1.click()
            }, Math.random() * 2000 + 3000);

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
            }, Math.random() * 2000 + 3000);
        }
    }
}

//translations = inputTranslations();

// setInterval(() => {
//     doIt(); // wykonaj wszystko
// }, 8000);


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
    //var translationsToAssing = prompt("Podaj słownik słowa w odpowiednim formacie", "[tutaj słowa w odpowiednim formacie]");
    // translations = JSON.parse(translationsToAssing);
    // return translations;
}

// var myJson = JSON.parse(translations);
