import parser from 'url'
import { Server } from "http";
import server from "../server";
import { CockPit } from ".";
import Sender from "../server/sender";
import Receiver from "../server/receiver";

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
                console.log(req.url, 'req.url')
                // TODO: implement dynamic url incase url contains ":"
                if(req.url) {
                    const receiver = new Receiver(req);
                    const sender = new Sender(req, res);
                    receiver.query = this.queryParser(req.url);
                    const paths: string[] = [];
                    for(const path of Object.keys(this.cockPit.paths)) {
                        paths.push(path);
                    }
                    receiver.params = this.paramsParser(req.url, paths);
                    console.log(receiver.params, 'receiver params')
                    this.cockPit.paths[req.url](receiver, sender);
                } else {
                }
            })
            this.server.listen(this.port, this.host, cb);
        }
        
    }

    private queryParser(url: string): Record<string, any> {
        const result = parser.parse(url);
        const query = result.query;
        const queries: Record<string, any> = {};
        if(query) {
            const obj = query.split("&");
            obj.map((a)=>{
                const [key, value] = a.split("=");
                queries[key] = value;
            })
        }
        return queries;
    }

    private checkIfUrlMatch(url: string, paths: string[]): boolean {
        const result = paths.find(path=>path.match(url));
        return result ? true : false;
    }

    private paramsParser(url: string, paths: string[]): Record<string, any> {
        const isMatched = this.checkIfUrlMatch(url, paths);
        let params: {}[] = []
        if(isMatched) {
            return params;
        }
        const filteredPaths = paths.filter(path=>path.includes(':'));
        const requestedPath = this.replaceAll(url);
        for(const path of filteredPaths) {
            const targetPath = this.replaceAll(path);
            if(requestedPath.split(" ").length === targetPath.split(" ").length) {
                params = this.findParams(
                    targetPath.split(" "), 
                    requestedPath.split(" "), 
                    [])
            }
            if(params.length > 0) {
                break;
            }
        }
        return params;
    }

    private replaceAll(str: string) {
        let newStr = str;
        if(str.includes("/")) {
            newStr = this.replaceAll(str.replace("/"," "))
        }
        return newStr
    }

    private findParams(a: string[], b:string[], params: {}[]) {
        const resultParams = params
        const index = a.findIndex(i=>i.includes(":"))
        if(index < 0) {
            return resultParams
        }
        resultParams.push({
            key: a[index].replace(":",""),
            value: b[index]
        })
        this.findParams(a.slice(index + 1), b.slice(index + 1), resultParams)
        return resultParams
    }

}

export default Wrapper