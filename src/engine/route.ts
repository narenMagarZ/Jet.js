import {BaseRouteInterface} from "../interfaces";
import {handlerType} from "../types";

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
    constructor(private readonly basePath: string) {
        super();
    }
}