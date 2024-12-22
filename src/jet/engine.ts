import server from "../server";


class Engine {
    protected staticPaths: string[]
    private constructor(missions: any[]) {
        this.buildEngine(missions)
        this.staticPaths = []
    }

    private buildEngine(missions: any[]) {
        missions.map(mission=>{
            const {path, handler} = mission
            server.on(path, handler);
        })
        return server;
    }

    protected setStaticPath(path: string) {
        return this.staticPaths.push(path);
    }

    private renderAssests() {
        this.staticPaths.map(path=>{
            
        })
    }
}

export default Engine