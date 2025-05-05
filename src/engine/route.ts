import {BaseRouteInterface} from "../interfaces";
import {handlerType} from "../types";
import {HttpMethod} from "../enum";

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

export class Route extends BaseRoute {
    private routes: Record<string, Record<HttpMethod, handlerType>>;
    constructor(private readonly basePath: string) {
        super();
        this.routes = {};
    }
    get(...handler: handlerType) {
        this.addRoute(this.basePath, HttpMethod.GET, handler);
        return this;
    }

    post(...handler: handlerType) {
        this.addRoute(this.basePath, HttpMethod.POST, handler);
        return this;
    }

    put(...handler: handlerType) {
        this.addRoute(this.basePath, HttpMethod.PUT, handler);
        return this;
    }

    delete(...handler: handlerType) {
        this.addRoute(this.basePath, HttpMethod.DELETE, handler);
        return this;
    }

    patch(...handler: handlerType) {
        this.addRoute(this.basePath, HttpMethod.PATCH, handler);
        return this;
    }

    private initializeRoute() {
        return {
            [HttpMethod.GET]: [],
            [HttpMethod.POST]: [],
            [HttpMethod.DELETE]: [],
            [HttpMethod.PATCH]: [],
            [HttpMethod.PUT]: [],
        }
    }

    private addRoute(path: string, httpMethod: HttpMethod, handler: handlerType) {
        const route = this.routes[path];
        if(route) {
            this.routes[path] = {
                ...this.routes[path],
                [httpMethod]: handler
            }
        } else {
            this.routes[path] = { ...this.initializeRoute(), [httpMethod]: handler}
        }
        return this.routes;
    }

    public getRouteHandler() {
        return this.routes;
    }
}