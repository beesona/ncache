import { Tedis, TedisPool } from "tedis";
import { get } from 'request-promise-native';
import { Base64 } from 'js-base64';
import { CacheClient } from "./CacheClient";
import { IHashObjectModel } from "../models/IHashObjectModel";
import { promisify } from 'util';
import { hostname } from "os";

export class GenericInfoManager {

    _redisClient: CacheClient;

    REDIS_PORT = +process.env.REDIS_PORT || 6379;
    REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
    
    constructor(){
        this._redisClient = new CacheClient(this.REDIS_HOST, this.REDIS_PORT);
    }

    public async testGetAndSet(): Promise<string> {
        let resp: string = '[';
        for (let x: number = 1; x <= 20; x++){
            await this.getGenericInfo(encodeURI('https://jsonplaceholder.typicode.com/todos/' + x.toString()), 'test').then(x => {
                resp += x + ',';
            });
        }
        resp += ']';
        return resp;
    }

    public async setGenericInfo(url: string, id: string): Promise<string>{

        let decodedUrl = decodeURI(url);
        let data = await this.GetDataFromUrl(decodedUrl);
        let resp: string;
        await this._redisClient.setHash(url, {id: id, type: 'urlResponse', data: JSON.stringify(data)})
            .then(responseData => {
                resp = responseData;
            });
        return resp;
    }

    public async getGenericInfo(url: string, id: string): Promise<string> {
        
        // get borrower for redis
        let resp: string;
        await this._redisClient.getHashByKey(url).then(responseData => {
            resp = responseData;
        });  
        
        if (!resp){
            await this.setGenericInfo(url, url).then(setResponse => {
                resp = setResponse;
            });            
        }
        return resp;
    }

    public closeCacheClient(){
        this._redisClient.close();
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