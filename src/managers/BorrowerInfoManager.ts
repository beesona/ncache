import { IBorrowerInfoModel } from "../models/IBorrowerInfoModel";
import { Tedis, TedisPool } from "tedis";
import { get } from 'request-promise-native';

export class BorrowerInfoManager {

    private BORR_URL: string = 'http://dev.intsvc.nelnet.net:4106/api/mma/v1/borrowerinfo/';
    private BORR_PARAMS: string = '/1/true/true/true/true/true';  

    REDIS_PORT = +process.env.REDIS_PORT || 6379;
    REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';

    public async getBorrowerInfo(ssn: string): Promise<string> {

        const tedis = new Tedis({
            port: 6379,
            host: "redis" // change to point to env configs before deployment
        });
        
        const fullUrl: string = `${this.BORR_URL}${ssn}${this.BORR_PARAMS}`;

        // get borrower for redis
        var borrower = await tedis.get(ssn);

        // if we didnt get a borrower, go get it from service, throw it in redis, and return value
        if (!borrower){
            return get(fullUrl).then(body => {
                tedis.set(ssn, body);
                return body;
            }).catch(e => console.log(e));
        }else{
            return borrower.toString();
        }

    }
}