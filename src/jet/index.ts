import { DEFAULTHOST } from "../constant"
import { CockPitInterface } from "../interfaces"
import Receiver from "../server/receiver"
import Sender from "../server/sender"
import Wrapper from "./wrapper"

export class CockPit implements CockPitInterface {
    public paths!: Record<string, (req: Receiver, res: Sender)=>void>
    public constructor() {
        this.paths = {}
    }
    public get(path: string, handler?: (req: Receiver, res: Sender)=>void) {
        this.paths[path] = handler!
        return { } as CockPitInterface
    }
    public post(path: string, handler?: (req: Receiver, res: Sender)=>void) {
        this.paths[path] = handler!
        return {} as CockPitInterface
    }

    public delete(path: string, handler?: (req: Receiver, res: Sender)=>void) {
        this.paths[path] = handler!
        return {} as CockPitInterface
    }

    public put(path: string, handler?: (req: Receiver, res: Sender)=>void) {
        this.paths[path] = handler!
        return {} as CockPitInterface
    }

}

class Jet {
    private host: string
    private port: number
    public cockpit: CockPit
    private wrapper?: Wrapper
    private auto: boolean
    public constructor(
        port: number,
        auto?: boolean
    ) {
        this.port = port
        this.host = DEFAULTHOST
        this.cockpit = new CockPit()
        this.auto = auto || false
    }
    
    public engine(cb?: ()=>void) {
        this.wrapper = new Wrapper(this.host, this.port, cb, this.cockpit)
    }
}

export default Jet