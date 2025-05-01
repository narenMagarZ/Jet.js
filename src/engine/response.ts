import {IncomingMessage, ServerResponse} from "http";

export class Response extends ServerResponse {
    private response: ServerResponse
    constructor(req: IncomingMessage, res: ServerResponse) {
        super(req);
        this.response = res;
    }

    json(payload: object) {
        this.response.setHeader("content-type", "application/json");
        this.response.end(JSON.stringify(payload));
    }

    render() {

    }
}