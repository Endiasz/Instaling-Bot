const container = document.querySelector(".container");
const showWordsBtn = document.querySelector(".showTranslations");
const startBtn = document.querySelector(".startBot");
const stopBtn = document.querySelector(".stopBot");
const logElement = document.querySelector(".logs");
const addWordsBtn = document.querySelector(".addTranslations");
const deleteWordsBtn = document.querySelector(".deleteTranslations");

const inputErrors = document.querySelector("#numbOfError");
const timeBetween = document.querySelector("#timeBetween");

const wordLabel = document.querySelector(".paragraph");
wordLabel.style.display = "none";

///////////////////////////////////////////////////
// STORAGE
///////////////////////////////////////////////////

function getWords() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["words"], (result) => {
            resolve(result.words || {});
        });
    });
}

function normalizeWords(words) {
    let changed = false;

    for (const key in words) {
        if (typeof words[key] !== "object") {
            words[key] = {
                value: words[key],
                added: Date.now()
            };
            changed = true;
        }
    }

    if (changed) {
        chrome.storage.local.set({ words });
    }

    return words;
}

function saveWords(newWords) {
    return new Promise(async (resolve) => {
        let existing = await getWords();
        existing = normalizeWords(existing);

        for (const key in newWords) {
            if (existing[key]) {
                existing[key].value = newWords[key];
            } else {
                existing[key] = {
                    value: newWords[key],
                    added: Date.now()
                };
            }
        }

        chrome.storage.local.set({ words: existing }, () => {
            resolve(existing);
        });
    });
}

function clearWords() {
    chrome.storage.local.set({ words: {} });
}

///////////////////////////////////////////////////
// LOG
///////////////////////////////////////////////////

function log(msg) {
    logElement.innerHTML += msg + "<br>";
}

///////////////////////////////////////////////////
// BACKGROUND
///////////////////////////////////////////////////

function getWordsFromBackground() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: "getWords" }, async (response) => {
            if (chrome.runtime.lastError) {
                console.warn("Brak odbiorcy:", chrome.runtime.lastError.message);
                resolve({});
                return;
            }
            let words = response.words || {};
            words = normalizeWords(words);
            resolve(words);
        });
    });
}

///////////////////////////////////////////////////
// UI
///////////////////////////////////////////////////

let isShowing = false;

async function toggleWords() {
    if (!isShowing) {
        container.innerHTML = "";
        wordLabel.style.display = "block";

        const words = await getWordsFromBackground();

        for (const key in words) {
            const div = document.createElement("div");
            div.classList.add("element");

            const wordData = words[key];
            const value = wordData.value;
            const added = wordData.added;

            // 📅 DATA
            const date = new Date(added);
            const dateText = date.toLocaleString();

            div.title = `Dodano: ${dateText}`;

            // 🔤 TEXT
            const text = document.createElement("span");
            text.innerText = `${value} : ${key}`;
            text.style.cursor = "pointer";

            // ✏️ INLINE EDIT
            text.addEventListener("click", () => {
                const input = document.createElement("input");
                input.value = value;
                input.style.width = "60%";

                div.replaceChild(input, text);
                input.focus();

                const save = async () => {
                    const newVal = input.value.trim();
                    if (!newVal) return;

                    const allWords = await getWords();

                    if (typeof allWords[key] === "object") {
                        allWords[key].value = newVal;
                    } else {
                        allWords[key] = {
                            value: newVal,
                            added: Date.now()
                        };
                    }

                    chrome.storage.local.set({ words: allWords });

                    text.innerText = `${newVal} : ${key}`;
                    div.replaceChild(text, input);
                    log(`Zmieniono: ${key}`);
                };

                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") save();
                });

                input.addEventListener("blur", save);
            });

            // ❌ DELETE
            const delBtn = document.createElement("button");
            delBtn.innerText = "X";
            delBtn.style.marginLeft = "10px";
            delBtn.style.background = "red";
            delBtn.style.color = "white";

            delBtn.addEventListener("click", async () => {
                const allWords = await getWords();
                delete allWords[key];

                chrome.storage.local.set({ words: allWords }, () => {
                    log(`Usunięto: ${key}`);
                    toggleWords();
                    toggleWords();
                });
            });

            div.appendChild(text);
            div.appendChild(delBtn);
            container.appendChild(div);
        }
    } else {
        container.innerHTML = "";
        wordLabel.style.display = "none";
    }

    isShowing = !isShowing;
}

///////////////////////////////////////////////////
// ADD WORDS
///////////////////////////////////////////////////

function inputTranslations() {
    const input = prompt(
        'Podaj słówka np: "kot":"cat","pies":"dog"',
        ""
    );

    if (!input) {
        log("Nie podałeś słówek");
        return null;
    }

    try {
        const json = JSON.parse("{" + input + "}");
        log("Dodano słówka");
        return json;
    } catch (e) {
        log("Błąd JSON!");
        return null;
    }
}

async function addWords() {
    const data = inputTranslations();
    if (data) {
        await saveWords(data);
    }
}

///////////////////////////////////////////////////
// DELETE ALL
///////////////////////////////////////////////////

function deleteWords() {
    clearWords();
    log("Usunięto wszystkie słowa");
    container.innerHTML = "";
}

///////////////////////////////////////////////////
// BOT
///////////////////////////////////////////////////

function startBot() {
    log("Start bota");

    chrome.tabs.query({ currentWindow: true }, async (tabs) => {
        const wordsRaw = await getWords();

        // 👇 BOT dostaje tylko value
        const words = {};
        for (const key in wordsRaw) {
            words[key] = wordsRaw[key].value;
        }

        for (const tab of tabs) {
            if (
                tab.url.includes("instaling.pl/app/") ||
                tab.url.includes("instaling.pl/ling2/")
            ) {
                let errors = inputErrors.value || 3;
                let time = (timeBetween.value || 4) * 1000;
                if (time < 200) time = 200;

                chrome.tabs.sendMessage(tab.id, {
                    active: true,
                    sendWords: words,
                    errorsPerRun: errors,
                    timeBetween: time,
                });

                log("Bot uruchomiony");
                return;
            }
        }

        log("Nie znalazłem instaling");
    });
}

function stopBot() {
    log("Stop bota");

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        for (const tab of tabs) {
            if (
                tab.url.includes("instaling.pl/app/") ||
                tab.url.includes("instaling.pl/ling2/")
            ) {
                chrome.tabs.sendMessage(tab.id, { active: false });
                return;
            }
        }
    });
}

///////////////////////////////////////////////////
// EVENTS
///////////////////////////////////////////////////

showWordsBtn.addEventListener("click", toggleWords);
addWordsBtn.addEventListener("click", addWords);
deleteWordsBtn.addEventListener("click", deleteWords);
startBtn.addEventListener("click", startBot);
stopBtn.addEventListener("click", stopBot);