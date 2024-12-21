import server from "../server";


class Engine {
    private constructor(missions: any[]) {
        this.buildEngine(missions)
    }

    private buildEngine(missions: any[]) {
        missions.map(mission=>{
            const {path, handler} = mission
            server.on(path, handler);
        })
        return server;
    }
}

export default Engine