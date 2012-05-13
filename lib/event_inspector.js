if (typeof(EventInspector) != 'object') {
  EventInspector = {};
}

EventInspector.Inspector = function(elemId) {
  var eventContainer = document.getElementById(elemId);

  var addEvent = function() {
    var event = JSON.parse(eventContainer.innerText);
    chrome.extension.sendRequest(event);
    eventContainer.innerText = "";
  };

  eventContainer.addEventListener('event_fired', function() {
    addEvent();
  });

  if (eventContainer.innerText != "") {
    addEvent();
  }
};

try {
  var inspector = new EventInspector.Inspector('events_inspector');
} catch(err) {}