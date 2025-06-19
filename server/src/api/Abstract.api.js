/**
 * @callback APIHandler
 * @param {{param: Object, body: Object, headers: Object}} 
 * @param {{send: any, status: any, json: any}} 
 */

export default class AbstractAPI {
    /** Server instance */
    _server;
    /** @type {Map<String, APIHandler>} */
    _getMethods = new Map();
    /** @type {Map<String, APIHandler>} */
    _postMethods = new Map();
    /** @type {Map<String, APIHandler>} */
    _patchMethods = new Map();
    /** @type {Map<String, APIHandler>} */
    _deleteMethods = new Map();
    setApp(_serverInstance) {
        this._server = _serverInstance
        return this
    }
    injectGetEndpoints() {
        for(let [endpoint, callback] of this._getMethods) 
            this._server.get(endpoint, callback)
        return this
    }
    injectPostEndpoints() {
        for(let [endpoint, callback] of this._postMethods) 
            this._server.get(endpoint, callback)
        return this
    }
    injectPatchEndpoints() {
        for(let [endpoint, callback] of this._patchMethods) 
            this._server.get(endpoint, callback)
        return this
    }
    injectDeleteEndpoints() {
        for(let [endpoint, callback] of this._deleteMethods) 
            this._server.get(endpoint, callback)
        return this
    }
    injectEndpoints() {
        this.injectGetEndpoints()
        this.injectPostEndpoints()
        this.injectPatchEndpoints()
        this.injectDeleteEndpoints()
        return this
    }

}