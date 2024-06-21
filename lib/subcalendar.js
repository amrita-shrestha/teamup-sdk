import {Request} from "./request.js";

export class SubCalendar{
    #ENDPOINT = '/subcalendars'
    /**
     * Create a SubCalendar instance.
     * @param options
     */
    constructor(options) {
        this.requestInstance = new Request(options)
        this.requestInstance.setBasUrlWithCalenderKey()
    }

    /**
     * Creates a new sub-calendar.
     *
     * @param {{overlap: boolean, color: number, name: string, active: boolean}} options - The options for creating the sub-calendar.
     * @param {string} options.name - The name of the sub-calendar.
     * @param {boolean} options.active - The active status of the sub-calendar.
     * @param {string} options.teamUpColor - The color associated with the sub-calendar.
     * @param {boolean} options.overlap - The overlap setting for the sub-calendar.
     * @param {string} [options.type=null] - The type of the sub-calendar.
     * @param {string} [options.remote_id=null] - The remote ID associated with the sub-calendar.
     * @param {string} [options.feed_url=null] - The feed URL for the sub-calendar.
     * @param {number} [options.polling_interval=null] - The polling interval for the sub-calendar.
     * @returns  {Promise<Object>} The created sub-calendar.
     */
    async create(options)  {
        return await this.requestInstance.sendPostRequest(this.#ENDPOINT,options)
            .then(
                (response) =>  {
                    return response.data.subcalendars
                }
            ).catch((error)=>{
                console.error(error)
            })

    }

    /**
     * Lists all sub-calendars.
     *
     * @param {boolean} active - Whether to include inactive sub-calendars.
     * @returns {Promise<Object[]>} The list of sub-calendars.
     */
    async listSubCalendars(active){
        const query = {
            'includeInactive' : active
        }
        return await this.requestInstance.sendGetRequest(this.#ENDPOINT, {params:query}
        ).then((response) => {
            return response.data.subcalendars
        }).catch((error)=>{
            console.error("Can't fetch sub calender from team Up")
        })
    }

    /**
     * Retrieves a specific sub-calendar by ID.
     *
     * @param {string} subCalendarId - The ID of the sub-calendar to retrieve.
     * @returns {Promise<Object>} The sub-calendar.
     */
    async listASubCalendar(subCalendarId){
        const endpoint = `${this.#ENDPOINT}/${subCalendarId}`
        return await this.requestInstance.sendGetRequest(endpoint).then((response)=>{
            return response.data.subcalendar
        }).catch((error)=>{
            console.warn(error)
        })
    }

    /**
     * Updates a sub-calendar's details.
     *
     * @param {string} subCalendarId - The ID of the sub-calendar to update.
     * @param {Object} options - The options for updating the sub-calendar.
     * @param {string} [options.name] - The name of the sub-calendar.
     * @param {boolean} [options.active] - The active status of the sub-calendar.
     * @param {string} [options.teamUpColor] - The color associated with the sub-calendar.
     * @param {boolean} [options.overlap] - The overlap setting for the sub-calendar.
     * @param {string} [options.type=null] - The type of the sub-calendar.
     * @param {string} [options.remote_id=null] - The remote ID associated with the sub-calendar.
     * @param {string} [options.feed_url=null] - The feed URL for the sub-calendar.
     * @param {number} [options.polling_interval=null] - The polling interval for the sub-calendar.
     * @returns {Promise<Object>} The updated sub-calendar.
     */
    async update(subCalendarId,options = {}){
        const endpoint = `${this.#ENDPOINT}/${subCalendarId}`
        await this.requestInstance.sendPutRequest(endpoint,options)
            .then((response)=>{
                return response.data.subcalendar
            }).catch((error)=>{
                console.warn("Error")
            })
    }

    /**
     * Deletes a sub-calendar by ID.
     *
     * @param {string} subCalendarId - The ID of the sub-calendar to delete.
     * @returns {Promise<boolean>}
     */
    async delete(subCalendarId){
        const endpoint = `${this.#ENDPOINT}/${subCalendarId}`
        await this.requestInstance.sendDeleteRequest(endpoint)
        return true
    }

}