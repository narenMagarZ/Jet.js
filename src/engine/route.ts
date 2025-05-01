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
        console.log("done");
        return this;
    }
}