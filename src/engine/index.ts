// this package has jet class
// to create simple http server, we need to use Jet class,
// jet class extends to server from standard http
// it has simple listen method, support middlewares, router
// has inbuilt cors support, media uploads, static file support,


// flow of server
/*
- first create a server instance
-
 */

import { IncomingMessage, Server, ServerResponse } from "http";

type handlerType = Array<(request: Request, response: Response) => void>;

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PATCH = "PATCH",
    PUT = "PUT"
}

interface BaseRouteInterface {
    get: (...handler: handlerType) => BaseRouteInterface;
    post: (...handler: handlerType) => BaseRouteInterface;
    delete: (...handler: handlerType) => BaseRouteInterface;
    patch: (...handler: handlerType) => BaseRouteInterface;
    put: (...handler: handlerType) => BaseRouteInterface;
}

interface RouterInterface {
    get: (path: string, ...handler: handlerType) => void;
    post: (path: string, ...handler: handlerType) => void;
    delete: (path: string, ...handler: handlerType) => void;
    patch: (path: string, ...handler: handlerType) => void;
    put: (path: string, ...handler: handlerType) => void;
}

abstract class BaseRoute implements BaseRouteInterface {
    delete(...handler: handlerType): BaseRouteInterface {
        return this;
    }

    get(...handler: handlerType): BaseRouteInterface {
        return this;
    }

    patch(...handler: handlerType): BaseRouteInterface {
        return this;
    }

    post( ...handler: handlerType): BaseRouteInterface {
        return this;
    }

    put(...handler: handlerType): BaseRouteInterface {
        return this;
    }

}

class Route extends BaseRoute {
    constructor(private readonly basePath: string) {
        super();
    }
}

class Router implements RouterInterface {
    private routes: Record<HttpMethod, Record<string, handlerType>>;
    constructor() {
        this.routes = {
            [HttpMethod.GET]: {},
            [HttpMethod.POST]: {},
            [HttpMethod.DELETE]: {},
            [HttpMethod.PUT]: {},
            [HttpMethod.PATCH]: {},
        };
    }

    private addRoutes(httpMethod: HttpMethod, path: string, handlers: handlerType) {
        const route = this.routes[httpMethod];
        route[path] = handlers;
        console.log(this.routes, 'this.routes')
        return route;
    }

    public get(path: string, ...handlers: handlerType) {
        this.addRoutes(HttpMethod.GET, path, handlers);
    }

    public post(path: string, ...handlers: handlerType) {
        this.addRoutes(HttpMethod.POST, path, handlers);
    }

    public delete(path: string, ...handlers: handlerType) {
        this.addRoutes(HttpMethod.DELETE, path, handlers);
    }

    public put(path: string, ...handlers: handlerType) {
        this.addRoutes(HttpMethod.PUT, path, handlers);
    }

    public patch(path: string, ...handlers: handlerType) {
        this.addRoutes(HttpMethod.PATCH, path, handlers);
    }

    public route(path: string) {
        return new Route(path);
    }

    public getHandlers(method: HttpMethod, path: string) {
        const route =  this.routes[method];
        if(route) {
            return route[path] || [];
        }
        return [];
    }

}

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

class Request extends IncomingMessage {
    constructor(request: IncomingMessage) {
        super(request.socket);
        Object.assign(this, request);
        this.buildRequest(request);
    }
    private buildRequest(request: IncomingMessage) {

    }

   get query() {
       return {}
   }

   get params() {
       return {}
   }

   get body() {
       return {}
   }

   get files() {
        return [];
   }

}

class Response extends ServerResponse {
    private response: ServerResponse
    constructor(req: IncomingMessage, res: ServerResponse) {
        super(req);
        this.response = res;
    }

    json(payload: object) {
        this.response.setHeader("content-type", "application/json");
        this.response.end(JSON.stringify(payload));
    }

    render() {

    }
}
const jet = new Jet();
jet.use(async() => {
    console.log("request get")
})

const apiRouter = jet.router();
const adminRouter = jet.router();
apiRouter.get('/api/v1', (req, res) => {
    res.json({
        message: "api fetched successfully"
    });
})

apiRouter.get("/api/v2", (req, res) => {
    res.json({
        message: "api v2 fetched successfully"
    })
})

adminRouter.get("/admin/api/v1", (req, res) => {
    res.json({
        message: "admin fetched successfully"
    })
})

adminRouter.post("/admin/api/v1", (req, res) => {
    res.json({
        message: "admin create user successfully",
        code: 201
    })
})
//
// adminRouter.get("/admin/api/v1", (req, res) => {
//     res.json({
//         message: "admin api fetched successfully"
//     })
// })

jet.listen(3000, () => {
    console.log("server listening on port", 3000)
});

