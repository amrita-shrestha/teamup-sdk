import {Token} from "./token.js";
import {SubCalendar} from "./subcalendar.js";
import {Event} from "./event.js";

export class Teamup{

    /**
     * Creates an instance of Teamup.
     *
     * @param {url,calendarKey,apiKey, password, bearerToken} options - Configuration options for the Teamup client.
     * @param {string} options.baseUrl - The base URL for the Teamup API.
     * @param {string} options.calendarKey - The calendar key for accessing specific calendars.
     * @param {string} options.apiKey - The API key for authentication.
     * @param {string} [options.password=null] - The password for authentication (optional).
     * @param {string} [options.bearerToken=null] - The bearer token for authentication (optional).
     */
    constructor(options) {
        if (!options.baseUrl || Object.keys(options).length === 0){
            // todo create own exception
            throw new Error("you must provide necessary teamup options url, apikeys")
        }
        
        this.token = new Token(options)
        this.subCalendar = new SubCalendar(options)
        this.event = new Event(options)
    }
}