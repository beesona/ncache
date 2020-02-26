import { Tedis, TedisPool } from "tedis";
import { IHashObjectModel } from "../models/IHashObjectModel";

interface Hash<T> {
    [propName: string]: T;
}

// NOT IMPLEMENTED. Will refactor to implement ICacheClient to decouple redis from app later on...
export class CacheClient{

    private _client: Tedis;
    
    constructor(hostName: string, hostPort: number){
        this._client = new Tedis({
            host: hostName,
            port: hostPort
        });
    }

    public async setKey(key: string, data: string): Promise<string>{

        await this._client.set(key, data)
        .catch((e) => {
            console.log(e);
            return '';
            });
        return 'OK';
    }

    public async setHash(key: string, data: IHashObjectModel): Promise<string>{
        let resp: string;
        if (data.id === undefined){
            data.id = this.createKey();
        }
        await this._client.hmset(key, {id: data.id, type: data.type, data: data.data}).then(hashData => {
            if (hashData == 'OK'){
                resp = JSON.stringify(data);
            }else{
                resp = 'Failed to cache data.';
            }
        });
        return resp;
    }

    public async getStringByKey(key: string): Promise<string>{
        let resp: string;
        await this._client.get(key).then((data) => {
            resp = data.toString();
            })
        .catch((e) => {
             console.log(e);
             resp = '';
            });
        return resp;
    }

    public async getHashByKey(key: string ): Promise<string>{        
        let resp: string = '';
        await this._client.hgetall(key)
        .catch((e) => {
             console.log(e);
             return new Object;
            }).then(hashData => {
                if (hashData['data'] === undefined){
                    resp = undefined;
                }else{
                    resp = JSON.stringify(hashData);
                }
            });
            return resp;
    }

    public async getHashesByQuery(fieldToQuery: string, matchValue: string): Promise<Array<object>>{

        return [];
    }

    close(){
        this._client.close();
    }
    
    private createKey(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}