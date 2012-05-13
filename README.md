Event Inspector
===

What is it?
---
The event inspector is a Chrome extension that allows you to view any events that you generate in your application easily through your browser. No need to use the console to log your events... and it works on production!

How to use
---
1. (Optional) Modify the manifest.json to add your domains to the content_scripts/matches section.

2. Load the Chrome extension using the crx file, or if you modified the manifest, load the unpackaged extension.

3. Modify your web app to add a div container for your events with the id `events-inspector`

4. Write any events you want to log to this container and fire an event_fired JavaScript event. Example JavaScript:

```javascript
var eventFired ||= document.createEvent('Event');
var eventsDiv;
var logEvent(params) = function() {
  eventFired.initEvent('event_fired', true, true);
  try {
    if (!eventsDiv) {
      eventsDiv = document.getElementById('events_inspector');
      eventsDiv.style.display = 'none';
    }
    if (eventsDiv.innerText === "") {
      eventsDiv.innerText = JSON.stringify([params]);
    } else {
      var eventsArray = JSON.parse(eventsDiv.innerText);
      eventsArray.unshift(params);
      eventsDiv.innerText = JSON.stringify(eventsArray);
    }
    eventsDiv.dispatchEvent(eventFired);
  } catch(err) { }
}
//Log an event to the event inspector
logEvent({name: 'page_view', page: window.location.pathname, domain: document.domain});
```

This produces an event in the inspector like so:

![Example event in the inspector popup](./event_inspector/raw/master/example.png)