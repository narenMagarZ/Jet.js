import { IncomingMessage, ServerResponse } from 'http'

class Sender extends ServerResponse{
    private res: ServerResponse
    public constructor(req: IncomingMessage, res: ServerResponse){
        super(req);
        this.res = res;
    }

    public json(data: any) {
        console.log(data, 'data')
        this.res.setHeader("content-type", "application/json")
        this.res.end(JSON.stringify(data))
    }

    public send() {

    } 

    public sendHtml() {

    }
}
export default Sender