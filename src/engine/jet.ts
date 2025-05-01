import {IncomingMessage, Server, ServerResponse} from "http";
import { Request } from "./request";
import { Response } from "./response";
import { HttpMethod } from "../enum";
import {Router} from "./router";
import {handlerType} from "../types";

class Jet extends Server {
    private middlewares: Array<(request: Request, res: Response) => void>;
    private readonly server: Server;
    private routers: Router[];
    constructor() {
        super();
        this.middlewares = [];
        this.server = new Server<typeof IncomingMessage, typeof ServerResponse>();
        this.routers = [];
    }

    private async handleRequest(request: Request, response: Response): Promise<void> {
        // handle middlewares
        for (const middleware of this.middlewares) {
            await middleware(request, response);
        }

        const method = request.method?.toUpperCase() as HttpMethod || 'GET',
            url: string = request.url || '/';
        let handlers: handlerType = [];
        for ( const router of this.routers ) {
            console.log(router, 'router')
            const tempHandlers = [...router.getHandlers(method, url)];
            handlers.push(...tempHandlers);
        }
        console.log(handlers, 'handlers')
        await this.executeHandlers(handlers, request, response);
    }

    private async executeHandlers(handlers: handlerType, request: Request, response: Response) {
        for(const handler of handlers) {
            await handler(request, response);
        }
    }

    public use(...handler: Array<(request: Request, res: Response) => void>) {
        this.middlewares.push(...handler);
    }

    public router() {
        const router = new Router();
        this.routers.push(router);
        return router;
    }

    public listen(...args: any): any {
        this.server.on("request", async (req, res) => {
            const request = new Request(req),
                response = new Response(req, res);
            await this.handleRequest(request, response);
        }).listen(...args);
        return this;
    }

}

export default Jet;