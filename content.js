console.log("Script go")

//chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(message, sender, sendResponse) {
    console.log(message);
    if (message.destination === undefined) {
        return;
    }


    if (message.active === undefined) {

    } else if (message.active === true) {
        console.log("StartBot");
    }
    else if (message.active === false) {
        console.log("StopBot");
    }
}

