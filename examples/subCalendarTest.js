import {Teamup} from "../lib/teamup.js";

const teamupCredentials = {
	baseUrl: 'https://api.teamup.com/',
	calendarKey: '<your-calendar-key>',
	apiKey: '<your-teamup-api-key>',
	password: null,
	bearerToken: null
}
const teamupManager = new Teamup(teamupCredentials)
const subCalendarData = {
	name: 'poom',
	active: true,
	color: 17,
	overlap: true
}
try {
	// create new sub-calendar
	const newCalendar = await teamupManager.subCalendar.create(subCalendarData)
	console.log(newCalendar.subcalendar.id)

	// delete sub-calendar
	await teamupManager.subCalendar.delete(newCalendar.subcalendar.id)
} catch (err){
	console.error(err)
}
// list all subCalendar
const listCalendars = await teamupManager.subCalendar.listSubCalendars(true)
console.log(listCalendars)

// list a specific sub-calendar using sub-calendar id
const  listSpecificCalendar= await teamupManager.subCalendar.listASubCalendar('13354144')
console.log(listSpecificCalendar)

