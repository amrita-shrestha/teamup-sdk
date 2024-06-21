import {Teamup} from "../lib/teamup.js";

const teamupCredentials = {
    baseUrl: 'https://api.teamup.com/',
    calendarKey: '<your-calendar-key>',
    apiKey: '<your-teamup-api-key>',
    password: null,
    bearerToken: null
}

const eventData = {
    subcalendar_ids: [13363095],
    start_dt: '2024-05-28T07:00:00Z',
    end_dt: '2024-05-28T23:59:00Z',
    all_day: false,
    notes: 'Every learner',
    title: 'Every',
    location: 'ad',
    who: 'all'
}
const params ={
    format: 'html'
}
const sampledataTodeleteEvent = {
    id: '1699974881',
    series_id: null,
    remote_id: null,
    subcalendar_id: 13363095,
    subcalendar_ids: [ 13363095 ],
    all_day: false,
    rrule: '',
    title: 'Every',
    who: 'all',
    location: 'ad',
    notes: '<p>Every learner</p>',
    version: 'b49d19327770',
    readonly: false,
    tz: 'Asia/Katmandu',
    attachments: [],
    start_dt: '2024-05-28T12:45:00+05:45',
    end_dt: '2024-05-29T05:44:00+05:45',
    ristart_dt: null,
    rsstart_dt: null,
    creation_dt: '2024-06-20T22:41:01+05:45',
    update_dt: null,
    delete_dt: null
}

const queryforlistingEvent = {
    endDate: '2024-06-20',
    startDate: '2024-04-01',
    subcalendarId: null,
    tz: 'Asia/Katmandu',
    format: 'html'
}

const queryforlistingEventWithstring = {
    endDate: '2024-06-20',
    startDate: '2024-04-01',
    subcalendarId: null,
    tz: 'Asia/Katmandu',
    query: 'life',
    limit: 100,
    offset:0,
    format: 'html'
}

const teamupManager = new Teamup(teamupCredentials)
try {
    // create new sub-calendar
    const newEvent = await teamupManager.event.create(params,eventData)
    console.log(newEvent)

    //delete event create above
    const deleteEvent = await teamupManager.event.delete(newEvent.id,newEvent)
    console.log(deleteEvent)
} catch (err){
    console.error(err)
}

// list events => we get filter event with queries
const listEvent = await teamupManager.event.getEvents(queryforlistingEvent)
console.log(listEvent)

// list single event information using event id
const listSingleEvent = await teamupManager.event.getSingleEvent('1696914276',params)
console.log(listSingleEvent)

const updateEventdata= {
    id: '1696914276',
    series_id: null,
    remote_id: null,
    subcalendar_id: 13363350,
    subcalendar_ids: [13363350],
    all_day: false,
    rrule: '',
    title: 'err',
    who: 'abu',
    location: '',
    notes: '',
    version: '8119d3822bfb',
    readonly: false,
    tz: 'Asia/Katmandu',
    attachments: [],
    start_dt: '2024-06-21T09:00:00',
    end_dt: '2024-06-21T13:15:00',
    ristart_dt: null,
    rsstart_dt: null,
    creation_dt: '2024-06-14T10:06:06+05:45',
    update_dt: '2024-06-21T10:10:21+05:45',
    delete_dt: null
}
// update an event information => start/end data , title,location,descriptions
const updateEvent = await teamupManager.event.update('1696914276',updateEventdata,params )
console.log(updateEvent)

// undo activity like deleting event, updating event using undoId provided when updated event or deleting event
const undoEvent = await teamupManager.event.undo('bd14ef55ac1d191d594c')
console.log(undoEvent)

// get history of an event
const eventHistory = await teamupManager.event.getEventHistory('1696914276')
console.log(eventHistory)

// get auxiliary information of an event
const getAuxInfo = await teamupManager.event.getEventAuxiliaryInformation('1696914276',params)
console.log(getAuxInfo)

// get event with modification time => max 30 day ago
const getEventWithModificationTimeData = {
    mode: 'monitor',
    modifiedSince: 2
}
const getEventWithModificationTime = await teamupManager.event.getEvents(getEventWithModificationTimeData)
console.log(getEventWithModificationTime)

// get an event in ICalendar format
const getEventInICF = await teamupManager.event.getEventInICSFormat('1696914276')
console.log(getEventInICF)

// create link of event which open site with event details
const evenLink = await teamupManager.event.createLink('1696914276')
console.log(evenLink)
