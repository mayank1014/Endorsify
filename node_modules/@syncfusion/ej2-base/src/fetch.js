import { isNullOrUndefined as isNOU, isObject, merge } from './util';
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
var Fetch = /** @class */ (function () {
    /**
     * Constructor for Fetch class.
     *
     * @param {string|Object} options - Specifies the URL or Request object with URL to which the request is to be sent.
     * @param {string} type - Specifies which request method is to be used, such as GET, POST, etc.
     * @param {string} contentType - Specifies the content type of the request, which is used to indicate the original media type of the resource.
     */
    function Fetch(options, type, contentType) {
        /**
         * Specifies which request method is to be used, such as GET, POST, etc.
         *
         * @default GET
         */
        this.type = 'GET';
        /**
         * A boolean value indicating whether to reject the promise or not.
         *
         * @private
         * @default true
         */
        this.emitError = true;
        if (typeof options === 'string') {
            this.url = options;
            this.type = !isNOU(type) ? type.toUpperCase() : this.type;
            this.contentType = contentType;
        }
        else if (isObject(options) && Object.keys(options).length > 0) {
            merge(this, options);
        }
        this.contentType = !isNOU(this.contentType) ? this.contentType : 'application/json; charset=utf-8';
    }
    /**
     * Send the request to server.
     *
     * @param {string|Object} data - Specifies the data that needs to be added to the request.
     * @returns {Promise<Response>} - Returns the response to a request.
     */
    Fetch.prototype.send = function (data) {
        var _this = this;
        var contentTypes = {
            'application/json': 'json',
            'multipart/form-data': 'formData',
            'application/octet-stream': 'blob',
            'application/x-www-form-urlencoded': 'formData'
        };
        try {
            if (isNOU(this.fetchRequest) && this.type === 'GET') {
                this.fetchRequest = new Request(this.url, { method: this.type });
            }
            else if (isNOU(this.fetchRequest)) {
                this.data = !isNOU(data) ? data : this.data;
                this.fetchRequest = new Request(this.url, {
                    method: this.type,
                    headers: { 'Content-Type': this.contentType },
                    body: this.data
                });
            }
            var eventArgs = { cancel: false, fetchRequest: this.fetchRequest };
            this.triggerEvent(this['beforeSend'], eventArgs);
            if (eventArgs.cancel) {
                return null;
            }
            this.fetchResponse = fetch(this.fetchRequest);
            return this.fetchResponse.then(function (response) {
                _this.triggerEvent(_this['onLoad'], response);
                if (!response.ok) {
                    throw response;
                }
                var responseType = 'text';
                for (var _i = 0, _a = Object.keys(contentTypes); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (response.headers.get('Content-Type') && response.headers.get('Content-Type').indexOf(key) !== -1) {
                        responseType = contentTypes[key];
                    }
                }
                return response[responseType]();
                // eslint-disable-next-line
            }).then(function (data) {
                _this.triggerEvent(_this['onSuccess'], data, _this);
                return data;
                // eslint-disable-next-line
            }).catch(function (error) {
                var returnVal = {};
                if (_this.emitError) {
                    _this.triggerEvent(_this['onFailure'], error);
                    returnVal = Promise.reject(error);
                }
                return returnVal;
            });
        }
        catch (error) {
            return error;
        }
    };
    Fetch.prototype.triggerEvent = function (callback, data, instance) {
        if (!isNOU(callback) && typeof callback === 'function') {
            callback(data, instance);
        }
    };
    return Fetch;
}());
export { Fetch };
