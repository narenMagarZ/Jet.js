import { IncomingMessage } from 'http'

class Receiver extends IncomingMessage { 
    public query: {}
    public body: {}
    public params: Record<string, any>
    public constructor(req: IncomingMessage) {
        super(req.socket)
        this.query = {}
        this.body = {}
        this.params = {}
    }
}

export default Receiver