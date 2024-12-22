import Receiver from "../server/receiver"
import Sender from "../server/sender"

export interface CockPitInterface {
    get: (path: string, handler?: (req: Receiver, res: Sender)=>void)=>CockPitInterface
    post: (path: string, handler?: (req: Receiver, res: Sender)=>void)=>CockPitInterface
    delete: (path: string, handler?: (req: Receiver, res: Sender)=>void)=>CockPitInterface
    put: (path: string, handler?: (req: Receiver, res: Sender)=>void)=>CockPitInterface
}