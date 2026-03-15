import http, { IncomingMessage, ServerResponse, Server } from "node:http";

type Param = Record<string, string>;


class JetIncomingMessage extends IncomingMessage {

  public body: any = undefined;
  public params: Param = {};

  private _query: Param;

  get query() {
    const url = this.url || "";
    const qIndex = url.indexOf("?");

    if (qIndex === -1) {
      this._query = {};
    } else {
      const searchParams = new URLSearchParams(url.substring(qIndex + 1));
      this._query = Object.fromEntries(searchParams.entries());
    }
    return this._query;
  }
}

class JetOutgoingMessage extends ServerResponse<JetIncomingMessage> {

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  redirect(location: string) {
    this.writeHead(302, { location });
  }

  json(data: any) {
    this.setHeader('Content-Type', 'application/json');
    return this.end(JSON.stringify(data));
  }

  sendFile(path: string) {
  }
}

type next = (err?: Error | unknown) => void;

type Middleware = (req: JetIncomingMessage, res: JetOutgoingMessage, next: next) => void;

interface Route {
  path: string;
  middleware: Middleware[];
  regex: string;
  cb: Function;
}

interface RoutesMap {
  [method: string]: Route[];
}

class Jet {
  private readonly server: Server<typeof JetIncomingMessage, typeof JetOutgoingMessage>;
  private readonly routes: RoutesMap;
  private readonly middleware: Middleware[];
  constructor() {
    this.routes = {};
    this.middleware = [];
    this.server = http.createServer({
      IncomingMessage: JetIncomingMessage,
      ServerResponse: JetOutgoingMessage
    });
    this.server.on('request', (request, response) => {
      
    });
  }

  listen(port: number, cb?: () => void) {
    return this.server.listen(port, cb);
  }

  use(...handler: Middleware[]) {
    this.middleware.push(...handler);
  }

  route(method: string, path: string, ...handler: Middleware[]) {
    if (!this.routes[method]) this.routes[method] = [];
    const cb = handler.pop();
    if (!cb) {
      throw new Error("Route must contain handler");
    }

    const middlewares = handler.flat() as Middleware[];
    this.routes[method].push({
      path: path,
      cb: cb,
      middleware: middlewares,
      regex: ''
    });
  }

}

const jet = () => new Jet();
export default jet;