import {Teamup} from "../lib/teamup.js";

const teamUpCredentials = {
	baseUrl: 'https://api.teamup.com/',
	calendarKey: '<your-calendar-key>',
	apiKey: '<your-teamup-api-key>',
	password: null,
	bearerToken: null
}
const teamUpManager = new Teamup(teamUpCredentials)

 /**
  * copy code from
  * tokenTest.js => contain example code related to access token api
  * eventTest,js => contain example code related to event api
  * subCalendarTest.js => contain example code related to subCalendar api
  *
  * command to run test => pnpm test
  */