import {IncomingMessage} from "http";

export class Request extends IncomingMessage {
    constructor(request: IncomingMessage) {
        super(request.socket);
        Object.assign(this, request);
        this.buildRequest(request);
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

}