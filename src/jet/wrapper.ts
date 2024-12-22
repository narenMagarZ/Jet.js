import { Server } from "http";
import server from "../server";
import { CockPit } from ".";
import Sender from "../server/sender";

class Wrapper {
    private server: Server 
    private port: number
    private host?: string
    private cockPit: CockPit
    public constructor(
        host: string, 
        port: number, 
        cb = ()=>{},
        cockpit: CockPit
    ) {
        this.server = server
        this.host = host;
        this.port = port;
        this.cockPit = cockpit;
        if(this.server) {
            this.server.on("request", ( req, res ) =>{
                if(req.url && this.cockPit.paths[req.url]) {
                    const sender = new Sender(req, res)
                    this.cockPit.paths[req.url](req, sender);
                }
            })
            this.server.listen(this.port, this.host, cb);
        }
        
    }
}

export default Wrapper