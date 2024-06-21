import {Request} from "./request.js";

export class Event {
    #ENDPOINT = '/events'
    constructor(options) {
        this.requestInstance = new Request(options)
        this.requestInstance.setBasUrlWithCalenderKey()
    }

    /**
     * Creates a new event.
     *
     * @param {Object} queryOptions - The options for creating the event.
     * @param {string} queryOptions.format - The format of the event data.
     * @param {string} queryOptions.inputFormat - The input format of the event data.
     * @param {Object} eventData
     * @param {Array<string>} eventData.subcalendar_ids - The IDs of the sub-calendars the event belongs to.
     * @param {Array<string>} eventData.subcalendar_remote_ids - The remote IDs of the sub-calendars.
     * @param {string} eventData.start_dt - The start date-time of the event.
     * @param {string} eventData.end_dt - The end date-time of the event.
     * @param {boolean} eventData.all_day - Whether the event lasts all day.
     * @param {string} eventData.rrule - The recurrence rule of the event.
     * @param {string} eventData.notes - Notes for the event.
     * @param {string} eventData.remote_id - The remote ID of the event.
     * @param {string} eventData.title - The title of the event.
     * @param {string} eventData.location - The location of the event.
     * @param {string} eventData.who - The people involved in the event.
     * @param {boolean} eventData.signup_enabled - Whether signup is enabled for the event.
     * @param {string} eventData.signup_deadline - The signup deadline for the event.
     * @param {string} eventData.signup_visibility - The visibility of the signup.
     * @param {number} eventData.signup_limit - The signup limit for the event.
     * @param {boolean} eventData.comments_enabled - Whether comments are enabled for the event.
     * @param {string} eventData.comments_visibility - The visibility of the comments.
     * @param {Object} eventData.custom - Custom fields for the event.
     * @param {Array<Object>} eventData.attachments - Attachments for the event.
     * @param {string} eventData.attachments[].name - The name of the attachment.
     * @param {number} eventData.attachments[].size - The size of the attachment.
     * @param {string} eventData.attachments[].mimetype - The MIME type of the attachment.
     * @param {string} eventData.attachments[].path - The path to the attachment.
     *
     * @returns {Promise<Object>} The created event.
     */
    async create( queryOptions,eventData){
        return await this.requestInstance.sendPostRequest(this.#ENDPOINT,eventData,
            {
                params:{
                    format: queryOptions.format,
                    inputFormat: queryOptions.inputFormat
                }
            }
        )
            .then(
                (response) =>  {
                    return response.data.event
                }
            ).catch((error)=>{
                console.error(error)
            })
    }

    /**
     * Deletes an event identified by eventId
     *
     * @async
     * @param {string} eventId - The ID of the event to delete.
     * @param {Object} eventData - The data associated with the event being deleted.
     * @param {Object} queryOption - Additional query parameters for the DELETE request.
     * @returns {Promise<Object>} The data from the response of the DELETE request.
     * @throws {Error} If the request fails, a warning is logged to the console.
     */
    async delete(eventId,eventData,queryOption){
        const endpoint = `${this.#ENDPOINT}/${eventId}`
        const config = {
            data: eventData,
            params : queryOption
        }
        return await this.requestInstance.sendDeleteRequest(endpoint,config).
        // await this.requestInstance.sendRequest({method:'DELETE',endpoint,headers:null,data:eventData,params:queryOption}).
        then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("can't delete")
        })
    }

    /**
     * Fetches events based on specified query options.
     *
     * @param {Object} queryOptions - Options to filter events.
     * @param {string} [queryOptions.endDate] - The end of the date range to list events from (inclusive), in YYYY-MM-DD format.
     *   If not specified, defaults to tomorrow.
     * @param {string} [queryOptions.startDate] - The start of the date range to list events from, in YYYY-MM-DD format.
     *   If not specified, defaults to today.
     * @param {number[]} [queryOptions.subcalendarId] - Array of sub-calendar IDs to restrict the response to selected sub-calendars.
     *   This parameter can be applied multiple times to the URL. Eg. `[1234, 6789]`.
     * @param {string} [queryOptions.tz] - The timezone to use for displaying returned events. Defaults to the calendar's timezone.
     * @param {string|string[]} [queryOptions.format] - Specifies the format(s) of the response. Can be a single string or an array of strings.
     *
     * to search event using query string `query` should be included in query parameters
     * @param {string} [queryOptions.query] - The string to search
     * @param {string} [queryOptions.limit] - The number of events to be returned at maximum for paged results
     * @param {string} [queryOptions.offset] - The offset for paged results, 0 by default
     *
     * to search modified events
     * @param {number} [queryOptions.modifiedSince] - days ago
     * @param {any} [queryOptions.mode] - synchronize or monitor
     *
     * @returns {Promise<Object>} A promise that resolves with the fetched events data.
     * @throws {Error} If there's an error fetching events.
     */
    async getEvents(queryOptions ) {
        if (queryOptions.modifiedSince){
            queryOptions.modifiedSince = this.#getTimestamp(queryOptions.modifiedSince)
        }
        console.log(queryOptions)
        const config = {
            params : queryOptions
        }
        return await this.requestInstance.sendGetRequest(this.#ENDPOINT,config).
        then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("Can't get events" . error)
        })
    }

    /**
     *
     * @param eventId
     * @param {Object} queryOptions - The options for creating the event.
     * @param {string} queryOptions.format - The format of the event data.
     * @returns {Promise<void>}
     */
    async getSingleEvent(eventId,queryOptions){
        const endpoint = `${this.#ENDPOINT}/${eventId}`
        const config = {
            params : queryOptions
        }
        return await this.requestInstance.sendGetRequest(this.#ENDPOINT, config).
        then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("Can't get events")
        })
    }

    /**
     * Update an event.
     *
     * @param eventId
     * @param {Object} queryOptions - The options for creating the event.
     * @param {string} queryOptions.format - The format of the event data.
     * @param {string} queryOptions.inputFormat - The input format of the event data.
     * @param {Object} eventData
     * @param {Array<string>} eventData.subcalendar_ids - The IDs of the sub-calendars the event belongs to.
     * @param {Array<string>} eventData.subcalendar_remote_ids - The remote IDs of the sub-calendars.
     * @param {string} eventData.start_dt - The start date-time of the event.
     * @param {string} eventData.end_dt - The end date-time of the event.
     * @param {boolean} eventData.all_day - Whether the event lasts all day.
     * @param {string} eventData.rrule - The recurrence rule of the event.
     * @param {string} eventData.notes - Notes for the event.
     * @param {string} eventData.remote_id - The remote ID of the event.
     * @param {string} eventData.title - The title of the event.
     * @param {string} eventData.location - The location of the event.
     * @param {string} eventData.who - The people involved in the event.
     * @param {boolean} eventData.signup_enabled - Whether signup is enabled for the event.
     * @param {string} eventData.signup_deadline - The signup deadline for the event.
     * @param {string} eventData.signup_visibility - The visibility of the signup.
     * @param {number} eventData.signup_limit - The signup limit for the event.
     * @param {boolean} eventData.comments_enabled - Whether comments are enabled for the event.
     * @param {string} eventData.comments_visibility - The visibility of the comments.
     * @param {Object} eventData.custom - Custom fields for the event.
     * @param {Array<Object>} eventData.attachments - Attachments for the event.
     * @param {string} eventData.attachments[].name - The name of the attachment.
     * @param {number} eventData.attachments[].size - The size of the attachment.
     * @param {string} eventData.attachments[].mimetype - The MIME type of the attachment.
     * @param {string} eventData.attachments[].path - The path to the attachment.
     *
     * @returns {Promise<Object>} The created event.
     */
    async update(eventId,eventData,queryOptions){
        const endpoint = `${this.#ENDPOINT}/${eventId}`
        const config = {
            params : queryOptions
        }
        return await this.requestInstance.sendPutRequest(endpoint,eventData).then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("Can't update event")
        })
    }

    /**
     * undo a specific action (event update, delete) identified by undoId.
     *
     * @async
     * @param {string} undoId - The ID of the action to undo.
     * @returns {Promise<boolean>} A promise that resolves to true if the undo operation is successful.
     * @throws {Error} If the request fails, a warning is logged to the console.
     */
    async undo(undoId){
        const endpoint = `${this.#ENDPOINT}/undo/${undoId}`
        return await this.requestInstance.sendPutRequest(endpoint).then((response)=>{
            return true
        }).catch((error)=>{
            console.warn("Can't undo")
        })
    }

    /**
     * Fetches the history of events for a specific event ID
     *
     * @async
     * @param {string} eventId - The ID of the event for which to fetch the history.
     * @returns {Promise<Object>} The history data from the response of the GET request.
     * @throws {Error} If the request fails, a warning is logged to the console.
     */
    async getEventHistory(eventId){
        const endpoint = `${this.#ENDPOINT}/${eventId}/history`
        return await this.requestInstance.sendGetRequest(endpoint).then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("Can't undo")
        })
    }

    /**
     * includes the event change history, events comments and signups, as well as reminders.
     * @param eventId
     * @param {Object} queryOptions - The options for creating the event.
     * @param {string} queryOptions.format - The format of the event data.
     * @returns {Promise}
     */
    async getEventAuxiliaryInformation(eventId,queryOptions){
        const endpoint = `${this.#ENDPOINT}/${eventId}/aux`
        const config = {
            params : queryOptions
        }
        return await this.requestInstance.sendGetRequest(endpoint, config).
        then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("Can't get events")
        })
    }

    /**
     * Fetches the event in ICS format for the given event ID
     *
     * @async
     * @param {string} eventId - The ID of the event to be fetched in ICS format.
     * @returns {Promise<string>} The ICS data from the response of the GET request.
     * @throws {Error} If the request fails, a warning is logged to the console.
     */
    async getEventInICSFormat(eventId){
        const endpoint = `${this.#ENDPOINT}/${eventId}.ics`
        return await this.requestInstance.sendGetRequest(endpoint).then((response)=>{
            return response.data
        }).catch((error)=>{
            console.warn("Can't undo")
        })
    }

    /**
     * helper function to convert day ago to timestamp (in second)
     * @param {number} daysAgo
     * @returns {number}
     */
    #getTimestamp(daysAgo){
        const now = new Date();

        const pastTimestamp = now.setDate(now.getDate() - daysAgo);

        return Math.floor(new Date(pastTimestamp).getTime() / 1000);
    }

    /**
     * Creates a link for the specified event.
     *
     * @async
     * @param {string} eventId - The ID of the event for which to create the link.
     * @returns {Promise<Object>} A promise that resolves to the response data.
     * @throws {Error} If the request fails, an error is logged to the console.
     */
    async createLink(eventId){
        const endpoint = `${this.#ENDPOINT}/${eventId}/pointer`
        return await this.requestInstance.sendPostRequest(endpoint)
            .then(
                (response) =>  {
                    return response.data
                }
            ).catch((error)=>{
                console.error(error)
            })
    }
}