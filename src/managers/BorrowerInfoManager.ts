import { IBorrowerInfoModel } from "../models/IBorrowerInfoModel";
import { RedisClient } from "redis";

export class BorrowerInfoManager {

    private BORR_URL: string = 'http://dev.intsvc.nelnet.net:4106/api/mma/v1/borrowerinfo/';
    private BORR_PARAMS: string = '/1/true/true/true/true/true';    
    getBorrowerInfo(ssn: string): string {
        
        const fullUrl: string = `${this.BORR_URL}${ssn}${this.BORR_PARAMS}`;
        var borrowerInfoData: IBorrowerInfoModel;

        // get borrower for redis

        // if we didnt get a borrower, go get it from service, throw it in redis, and return value
        if (!borrowerInfoData){

        }
        return '';
    }
}