import {Request} from "./request.js";

export class Token {
	#ENDPOINT = "/auth/tokens"
	
	constructor(options) {
		this.requestInstance = new Request(options)
	}
	
	/**
	 * Retrieves a bearer token from the authentication endpoint.
	 *
	 * @param {{password: string, appName: string, deviceID: null, email: string}} options - Options for retrieving the bearer token.
	 * @param {string} options.appName - The name of the application.
	 * @param {string} [options.deviceID=null] - The ID of the device (optional).
	 * @param {string} options.email - The email of the user.
	 * @param {string} options.password - The password of the user.
	 * @returns {Promise<any>} - A promise resolving to the bearer token.
	 * @throws {Error} - Throws an error if email and password are not provided.
	 */
	async getBearerToken(options) {
		if (options.email === null && options.password === null) {
			throw new Error("Email and password is required to get access token")
		}
		const data = {
			app_name: options.appName, device_id: options.deviceID, email: options.email, password: options.password
		}

		return await this.requestInstance.sendPostRequest(this.#ENDPOINT, data).then(response => {
			return response.data.auth_token
		}).catch(error => {
			console.error('Error:', error.message) // Handle errors from the HTTP request
		})
	}
	
}