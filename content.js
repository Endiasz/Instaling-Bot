console.log("Script go")

chrome.runtime.onMessage.addListener(gotMesssage);

function gotMesssage(request, sender, sendResponse) {
    console.log(request.txt);
}
