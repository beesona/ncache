import { Tedis, TedisPool } from "tedis";
import { get } from 'request-promise-native';
import { Base64 } from 'js-base64';
import { RedisClient } from "redis";
import { IHashObjectModel } from "../models/IHashObjectModel";

export class GenericInfoManager {

    _redisClient: RedisClient;
    constructor(){
        this._redisClient = new RedisClient({
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: +process.env.REDIS_PORT || 6379
        });
    }
    public async setGenericInfo(url: string, id: string): Promise<string>{

        let decodedUrl = decodeURI(url);
        let data = await this.GetDataFromUrl(decodedUrl);
        let resp: string;
        this._redisClient.hmset(url, {id: id, type: 'urlResponse', data: JSON.stringify(data)}, (err, cacheData) => {
            if (err) console.log(err);
        });
        return 'OK';
    }

    public async getGenericInfo(url: string, id: string): Promise<string> {
        
        // get borrower for redis
        let hashData: IHashObjectModel;
        let temp: any;
        temp = this._redisClient.hgetall(url, (err, data) => {
            if (err) {
                console.log(err);
            }else{
                if (!data){
                    this.setGenericInfo(url, id).then(data => {
                        temp = data;
                    });
                }
            }
        });    
        return temp;
    }

    public closeCacheClient(){
        this._redisClient.quit();
    }

    public async GetDataFromUrl(url: string): Promise<string>{
        let resp: string = '';
        await get(url).then(body => {
            resp = body;
        }).catch(e => {
            console.log(e);
            return '';
        });
        return resp;
    }
}