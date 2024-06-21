import {Teamup} from "../lib/teamup.js";

const teamupCredentials = {
	baseUrl: 'https://api.teamup.com/',
	calendarKey: '<your-calendar-key>',
	apiKey: '<your-teamup-api-key>',
	password: null,
	bearerToken: null
}
const teamupManager = new Teamup(teamupCredentials)
const teamupAuthCredentials = {
	appName: 'Amrita', deviceID: null, email: 'random@gmail.com', password: '<your-login-password>'
}
try{
	const token = await teamupManager.token.getBearerToken(teamupAuthCredentials)
	console.log(token)
} catch (error){
	console.error(error)
}
