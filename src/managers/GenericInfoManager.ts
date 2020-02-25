import { Tedis, TedisPool } from "tedis";
import { get } from 'request-promise-native';
import { Base64 } from 'js-base64';

export class GenericInfoManager {

    public async getGenericInfo(url: string): Promise<string> {

        // parse the URL and add the SSN into it

        const tedis = new Tedis({
            port: 6379,
            host: "redis" // change to point to env configs before deployment
        });
        
        // get borrower for redis
        var data = await tedis.get(url);

        // if we didnt get a borrower, go get it from service, throw it in redis, and return value
        if (!data){
            let decodedUrl = Base64.decode(url);
            return get(decodedUrl).then(body => {
                tedis.set(url, body);
                return body;
            }).catch(e => console.log(e));
        }else{
            return data.toString();
        }
        
    }
}