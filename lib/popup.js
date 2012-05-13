window.onload = function() {
  var event, events, eventHTML;
  var eventContainer = document.getElementById('event-inspector-container');
  var clearEventsLink = document.getElementById('clear-events');

  var eventItemHtml = function(key, value) {
    return "<li class='event-item'><span class='key'>" + key + "</span><span class='value'>" + value + "</span></li>";
  };

  var clearEvents = function() {
    eventContainer.innerHTML = "";
    localStorage["EventInspector.Events"] = "";
  }

  var resetCount = function() {
    localStorage["EventInspector.Events.Count"] = 0;
    chrome.browserAction.setBadgeText({text: ""});
  }

  if (localStorage["EventInspector.Events"] != "") {
    events = JSON.parse(localStorage["EventInspector.Events"]);
  } else {
    eventContainer.innerHTML += "None";
  }

  for (var i = 0; i < events.length; i++) {
    event = events[i];
    eventHTML = "<div class='container-item'><ul class='event'>";
    eventHTML += eventItemHtml('name', event.name);
    properties = event.properties;
    for (var key in properties) {
      eventHTML += eventItemHtml(key, properties[key]);
    }
    eventHTML += "</ul></div>"
    eventContainer.innerHTML += eventHTML;
  }

  clearEventsLink.onclick = clearEvents;
  resetCount();
};