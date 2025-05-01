import {IncomingMessage, ServerResponse} from "http";

export class Response extends ServerResponse {
    private response: ServerResponse
    public finished: boolean;
    constructor(req: IncomingMessage, res: ServerResponse) {
        super(req);
        this.response = res;
        this.finished = false;
    }

    json(payload: object) {
        this.finished = true;
        this.response.setHeader("content-type", "application/json");
        this.response.end(JSON.stringify(payload));
    }

    render() {

    }

}