import { DEFAULTHOST } from "../constant"
import server from "../server"
import { DestinationInterface } from "../interfaces"

class Jet {
    private host: string
    private port: number
    private dests: DestinationInterface[]
    public constructor(
        host: string, 
        port: number) {
        this.host = host || DEFAULTHOST
        this.port = port
        this.dests = []
    }

    public boost(cb: ()=>void) {
        server.listen(
            this.port, 
            this.host, 
            cb
        )
    }

    public dest(path: string, handler: ()=>void) {
        const mission = this.constructMission(path, handler);
        this.dests.push(mission);
    }

    private constructMission(path: string, handler: ()=>void) {
        return {
            path,
            handler
        }
    }
}

export default Jet