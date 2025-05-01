import {handlerType} from "../types";

export interface RouterInterface {
    get: (path: string, ...handler: handlerType) => void;
    post: (path: string, ...handler: handlerType) => void;
    delete: (path: string, ...handler: handlerType) => void;
    patch: (path: string, ...handler: handlerType) => void;
    put: (path: string, ...handler: handlerType) => void;
}

export interface BaseRouteInterface {
    get: (...handler: handlerType) => BaseRouteInterface;
    post: (...handler: handlerType) => BaseRouteInterface;
    delete: (...handler: handlerType) => BaseRouteInterface;
    patch: (...handler: handlerType) => BaseRouteInterface;
    put: (...handler: handlerType) => BaseRouteInterface;
}