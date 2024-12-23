import { IncomingMessage } from 'http'
import { Socket } from 'net'

class Receiver extends IncomingMessage { 
    public query: {}
    public body: {}
    public params: {}
    public constructor(req: IncomingMessage) {
        super(req.socket)
        this.query = {}
        this.body = {}
        this.params = {}
    }
}

export default Receiver