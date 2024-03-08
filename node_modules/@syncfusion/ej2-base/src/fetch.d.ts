/**
 * The Fetch class provides a way to make asynchronous network requests, typically to retrieve resources from a server.
 * ```typescript
 *   var fetchApi = new Fetch('index.html', 'GET');
 *   fetchApi.send()
 *      .then((value) => {
 *          console.log(value);
 *      }).catch((error) => {
 *          console.log(error);
 *      });
 * ```
 */
export declare class Fetch {
    /**
     * Specifies the URL to which the request is to be sent.
     *
     * @default null
     */
    url: string;
    /**
     * Specifies which request method is to be used, such as GET, POST, etc.
     *
     * @default GET
     */
    type: string;
    /**
     * Specifies the content type of the request, which is used to indicate the original media type of the resource.
     *
     * @default null
     */
    contentType: string;
    /**
     * Specifies the data that needs to be added to the request.
     *
     * @default null
     */
    data: string | Object;
    /**
     * A boolean value indicating whether to reject the promise or not.
     *
     * @private
     * @default true
     */
    emitError: boolean;
    /**
     * Specifies the request object that represents a resource request.
     *
     * @default null
     */
    fetchRequest: Request;
    /**
     * Represents a response to a request.
     *
     * @private
     * @default null
     */
    private fetchResponse;
    /**
     * Specifies the callback function to be triggered before sending the request to the server.
     * This can be used to modify the fetchRequest object before it is sent.
     *
     * @event beforeSend
     */
    beforeSend: Function;
    /**
     * Specifies the callback function to be triggered after the response is received.
     * This callback will be triggered even if the request is failed.
     *
     * @event onLoad
     */
    onLoad: Function;
    /**
     * Specifies the callback function to be triggered after the request is successful.
     * The callback will contain the server response as a parameter.
     *
     * @event onSuccess
     */
    onSuccess: Function;
    /**
     * Specifies the callback function to be triggered after the request is failed.
     *
     * @event onFailure
     */
    onFailure: Function;
    /**
     * Constructor for Fetch class.
     *
     * @param {string|Object} options - Specifies the URL or Request object with URL to which the request is to be sent.
     * @param {string} type - Specifies which request method is to be used, such as GET, POST, etc.
     * @param {string} contentType - Specifies the content type of the request, which is used to indicate the original media type of the resource.
     */
    constructor(options?: string | Object, type?: string, contentType?: string);
    /**
     * Send the request to server.
     *
     * @param {string|Object} data - Specifies the data that needs to be added to the request.
     * @returns {Promise<Response>} - Returns the response to a request.
     */
    send(data?: string | Object): Promise<Response>;
    private triggerEvent;
}
/**
 * Provides information about the beforeSend event.
 */
export interface BeforeSendFetchEventArgs {
    /**
     * A boolean value indicating whether to cancel the fetch request or not.
     */
    cancel?: boolean;
    /**
     * Returns the request object that represents a resource request.
     */
    fetchRequest: Request;
}
