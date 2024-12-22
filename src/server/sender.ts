import fs from 'fs/promises'
import path from 'path';
import { 
    IncomingMessage, 
    ServerResponse } from 'http'

class Sender extends ServerResponse{
    private res: ServerResponse
    public constructor(req: IncomingMessage, res: ServerResponse){
        super(req);
        this.res = res;
    }

    public json(data: Object) {
        this.res.setHeader("content-type", "application/json");
        this.res.end(JSON.stringify(data));
    }

    /**
     * 
     * @param data -> object | string | number | filename
     */
    public async send(data: Object | string | number) {
        if(typeof data === 'object') {
            this.json(data);
        } else if(typeof data === 'string' && data.search(new RegExp(/(.html)|(.htm)/))) {
            await this.sendHtml(data);
        } else {
            this.res.setHeader("content-type", "text/plain");
            this.res.end(data);
        }
    } 

    /**
     * 
     * @param fileName -> this must be absolute file path
     */
    public async sendHtml(fileName: string) {
        const pathToHtmlFile = path.join(__dirname, fileName);
        try {
            const htmlContent = await fs.readFile(pathToHtmlFile);
            this.res.setHeader("content-type", "text/html")
            this.res.end(htmlContent.toString('utf-8'));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export default Sender