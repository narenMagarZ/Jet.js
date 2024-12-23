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
                if(req.url) {
                    const receiver = new Receiver(req),
                    sender = new Sender(req, res),
                    paths: string[] = [];
                    receiver.query = this.queryParser(req.url);
                    for(const path of Object.keys(this.cockPit.paths)) {
                        paths.push(path);
                    }
                    const {
                        matchedUrl,
                        params
                    } = this.paramsParser(req.url, paths);
                    receiver.params = params;
                    this.cockPit.paths[Object.keys(params).length > 0 ? matchedUrl : req.url](receiver, sender);
                } else {
                }
            })
            this.server.listen(this.port, this.host, cb);
        }
        
    }

    private queryParser(url: string): Record<string, any> {
        const result = parser.parse(url),
        query = result.query,
        queries: Record<string, any> = {};
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

    private paramsParser(url: string, paths: string[]): {
        matchedUrl: string,
        params: Record<string, any>
    } {
        const isMatched = this.checkIfUrlMatch(url, paths)
        let params: Record<string, any> = {},
        matchedUrl = ""
        if(isMatched) {
            return {
                matchedUrl,
                params
            };
        }
        const filteredPaths = paths.filter(path=>path.includes(':')), 
        requestedPath = this.replaceAll(url);
        for(const path of filteredPaths) {
            const targetPath = this.replaceAll(path);
            if(requestedPath.split(" ").length === targetPath.split(" ").length) {
                params = this.findParams(
                    targetPath.split(" "), 
                    requestedPath.split(" "), 
                    {});
            }
            if(Object.keys(params).length > 0) {
                matchedUrl = path;
                break;
            }
        }
        return {
            params,
            matchedUrl
        };
    }

    private replaceAll(str: string) {
        let newStr = str;
        if(str.includes("/")) {
            newStr = this.replaceAll(str.replace("/"," "))
        }
        return newStr
    }

    private findParams(a: string[], b:string[], params: Record<string, any>) {
        const resultParams = params,
        index = a.findIndex(i=>i.includes(":"));
        if(index < 0) {
            return resultParams
        }
        resultParams[a[index].replace(":", "")] = b[index];
        this.findParams(a.slice(index + 1), b.slice(index + 1), resultParams)
        return resultParams
    }

}

export default Wrapper