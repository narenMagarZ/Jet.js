import {HttpMethod} from "../enum";
import {RouterInterface} from "../interfaces";
import {Route} from "./route";
import {handlerType} from "../types";

export class Router implements RouterInterface {
    private routes: Record<HttpMethod, Record<string, handlerType>>;
    private _route: Route | null;
    constructor() {
        this.routes = {
            [HttpMethod.GET]: {},
            [HttpMethod.POST]: {},
            [HttpMethod.DELETE]: {},
            [HttpMethod.PUT]: {},
            [HttpMethod.PATCH]: {},
        };
        this._route = null;
    }

    private addRoutes(httpMethod: HttpMethod, path: string, handlers: handlerType) {
        const route = this.routes[httpMethod];
        route[path] = handlers;
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

    public route(path: string): Route {
        this._route = new Route(path);
        return this._route;
    }

    public getHandlers(method: HttpMethod, path: string) {
        const route =  this.routes[method];
        if(route) {
            return route[path] || [];
        }
        return [];
    }

}