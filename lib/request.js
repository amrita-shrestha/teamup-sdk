import axios from "axios";

export class Request {
    #axios
    /**
     * Creates an instance of Teamup.
     *
     * @param {url|Request.calendarKey|Request.apiKey|password|Request.bearerToken|{url: string, calendarsKey: string, apiKey: string, password?: string, bearerToken?: string}} options - Configuration options for the Teamup client.
     * @param {string} options.url - The base URL for the Teamup API.
     * @param {string} options.calendarKey - The calendar key for accessing specific calendars.
     * @param {string} options.apiKey - The API key for authentication.
     * @param {string} [options.password=null] - The password for authentication (optional).
     * @param {string} [options.bearerToken=null] - The bearer token for authentication (optional).
     */
    constructor(options) {
        const { baseUrl, calendarKey, apiKey, password, bearerToken } = options;
        this.baseUrl = this.#getSanitizedUrl(baseUrl);
        this.calendarKey = calendarKey;
        this.apiKey = apiKey;
        this.password = password;
        this.bearerToken = bearerToken;

        this.#axios = axios.create({
            baseURL: this.baseUrl,
            headers:{
                ...this.#createAuthHeaders(),
                'Content-Type': 'application/json'
            }
        })
    }

    /**
     * Creates authentication headers based on provided options.
     *
     * @private
     * @returns {Object} Headers object with authentication tokens.
     */
    #createAuthHeaders(){
        let authHeader = {}
        if (this.apiKey) {
            authHeader['Teamup-Token'] = this.apiKey;
        }
        if (this.password){
            authHeader['Teamup-Password'] = this.password
        }
        if (this.bearerToken){
            authHeader['Authorization'] = `Bearer ${this.bearerToken}`
        }
        return authHeader
    }
    
    /**
     * Adds headers to Axios instance based on the provided key-value pairs.
     *
     * @param {Object} authHeader - The headers to be added, as key-value pairs.
     * @throws {Error} Throws an error if authHeader is not a valid object.
     * @example
     * Example usage:
     * const headers = {
     *   'Authorization': 'Bearer token',
     *   'Teamup-Password': 'M.Ee$%fdsGi.sdsd'
     * }
     * addAuthHeader(headers);
     */
    addAuthHeader(authHeader){
        // Validate headers to ensure it's an object with key-value pairs
        if (authHeader && typeof authHeader === 'object') {
            // Add each key-value pair to Axios headers
            Object.keys(authHeader).forEach(key => {
                this.#axios.defaults.headers.common[key] = authHeader[key];
            });
        } else {
            throw new Error('Invalid headers: must be an object with key-value pairs');
        }
    }

    #getSanitizedUrl(url){
        if (url.endsWith('/') && url.pathname !== '/'){
            return url.slice(0,-1)
        }
    }

    /**
     * Sets the base URL for the calendar key in the Axios instance.
     * The resulting URL will be `${this.baseUrl}/${this.calendarsKey}`.
     * This method updates the default base URL used for all requests.
     */
    setBasUrlWithCalenderKey(){
        this.#axios.defaults.baseURL = this.baseUrl +'/'+ this.calendarKey;
    }
    
    async sendPostRequest(endpoint,data,config){
        return await this.#axios.post(endpoint,data,config)
    }
    
    async sendDeleteRequest(endpoint,config){
        return await this.#axios.delete(endpoint,config)
    }
    
    async sendGetRequest(endpoint,config){
        return await this.#axios.get(endpoint,config)
    }

    async sendPutRequest(endpoint,data,config){
        return await this.#axios.put(endpoint,data,config)
    }
}