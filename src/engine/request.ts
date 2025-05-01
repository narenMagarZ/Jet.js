import {IncomingMessage} from "http";

export class Request extends IncomingMessage {
    private _context: any
    constructor(request: IncomingMessage) {
        super(request.socket);
        Object.assign(this, request);
        this.buildRequest(request);
        this._context = {};
    }

    private buildRequest(request: IncomingMessage) {

    }

    get query() {
        return {}
    }

    get params() {
        return {}
    }

    get body() {
        return {}
    }

    get files() {
        return [];
    }

    set context(context: any) {
        this._context = context;
    }

    get context() {
        return this._context;
    }

}
