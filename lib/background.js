localStorage["EventInspector.Events"] = "";
localStorage["EventInspector.Events.Count"] = "0";

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var eventsArray;

    if (localStorage["EventInspector.Events"] === "") {
      eventsArray = request;
    } else {
      eventsArray = JSON.parse(localStorage["EventInspector.Events"]);
      for (var i = 0; i < request.length; i++) {
        eventsArray.unshift(request[i]);
      }
    }

    var eventsCount = parseInt(localStorage["EventInspector.Events.Count"], 10);
    eventsCount += request.length;
    chrome.browserAction.setBadgeText({text: eventsCount.toString()});

    localStorage["EventInspector.Events"] = JSON.stringify(eventsArray);
    localStorage["EventInspector.Events.Count"] = eventsCount;
  }
);