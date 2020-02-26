import { GenericInfoManager } from "../managers/GenericInfoManager";
import { IHashObjectModel } from "../models/IHashObjectModel";

jest.mock('./mocks/request.ts');
const URL: string = 'https://jsonplaceholder.typicode.com/todos/1';

describe("GenericInfoManager", () => {
    let instance: GenericInfoManager;

    beforeEach(() => {
        instance = new GenericInfoManager();
    });

    it('should get data back from URL provided', async () => {        
        expect(instance).toBeInstanceOf(GenericInfoManager);
        await instance.GetDataFromUrl(URL).then(resp => {
           expect(resp).toBeDefined();
           expect(resp.length > 0).toBeTruthy();
        });
    });

    it('should get data from the cache', async () => {
        expect(instance).toBeInstanceOf(GenericInfoManager);
        await instance.getGenericInfo(URL, 'test').then(data => {
            let returnData: string = data;
        });
    });

    it('should set data into the cache', async () => {
        expect(instance).toBeInstanceOf(GenericInfoManager);
        await instance.setGenericInfo(URL, 'test').then(data => {
            expect(JSON.parse(data).id).toBe('test');
            expect(JSON.parse(data).type).toBe('urlResponse');
        });
    });

    afterEach(done => {
        instance.closeCacheClient();
        done();
    });
});