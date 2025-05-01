import {Request} from "../engine/request";
import {Response} from "../engine/response";

export type handlerType = Array<(request: Request, response: Response) => void>;