## teamup-sdk
TeamUp is a collaborative calendar platform that allows individuals and groups to organize, schedule, and share events and resources efficiently. It offers various features designed to facilitate coordination and communication among teams, organizations, and communities.
To get familiar with TeamUp api, visit [teamup API](https://apidocs.teamup.com/).

### Functions

#### Event
- create an event 
`teamUpInstance.event.create(queryOptions,eventData)`
- delete an event
`teamUpInstance.event.delete(eventId,eventData)`
- get multiple events (same function can be use to filter event with modification time, query string, start and end time)
`teamUpInstance.event.getEvents(queryOptions)`
- get single event using eventId
`teamUpInstance.event.getSingleEvent(eventId,queryOptions)`
- update an event details 
`teamUpInstance.event.update(eventId,eventData,queryOptions)`
- undo action like deleting event, updating event with undoId recieved on api response of upate and delete
`teamUpInstance.event.undo(undoId)`
- get history of an event 
`teamUpInstance.event.getEventHistory(eventId)`
- get an event auxiliary information 
`teamUpInstance.event.getEventAuxiliaryInformation(eventId,queryOptions)`
- get an event in ICALENDAR format 
`teamUpInstance.event.getEventInICSFormat(eventId)`
- create link for an event 
`teamUpInstance.event.createLink(eventId)`

#### Sub-calendar
- create an event
  `teamUpInstance.subCalendar.create(options)`
- delete an event
  `teamUpInstance.subCalendar.delete(subCalendarId)`
- list all subCalendars
  `teamUpInstance.subCalendar.listSubCalendars(boolean)`
- list detail about a single subCalendar
  `teamUpInstance.subCalendar.listASubCalendar(subCalendarId)`

#### Token
- get access token
  `teamUpInstance.token.getBearerToken(options)`

### How to use

### Future Improvement Plan

 - Add Custom Exception
 - Add unit tests
 - Add CI
 - Add more api endpoint