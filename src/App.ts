import * as express from 'express';
import {BorrowerInfoManager } from './managers/BorrowerInfoManager';
import {GenericInfoManager } from './managers/GenericInfoManager';

class App {

    public express;
    private borrowerInfoManager: BorrowerInfoManager;
    private genericInfoManager: GenericInfoManager;

    constructor() {
        this.express = express();
        this.mountRoutes();
        this.borrowerInfoManager = new BorrowerInfoManager();
        this.genericInfoManager = new GenericInfoManager();
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({message: 'Two Available Routes: /getdatabyid/:id, and /getdatabyurl/:url. try using 003823158 for id endpoint, or "http%3A%2F%2Fdev.intsvc.nelnet.net%2FHistoryNote%2Fapi%2Fv1%2Fhistorynotes%2F99%2F1%2F003823158%2Fabeeson%3FrequestId%3D5302fe94-7596-41f6-84a8-2977f5c3eecf" for url (URLs are URI Encoded.)'});
        });

        router.get('/getdatabyid/:id', (req, res) => {            
            this.borrowerInfoManager.getBorrowerInfo(req.params['id']).then(val => {
                res.json({message: val});
            });
        });

        router.get('/getdatabyurl/:url', (req, res) => {            
            this.genericInfoManager.getGenericInfo(req.params['url'], req.params['url']).then(val => {
                res.json({message: val});
            });
        });

        router.get('/getdatabyurl/:id/:url', (req, res) => {            
            this.genericInfoManager.getGenericInfo(req.params['url'], req.params['id']).then(val => {
                res.json({message: val});
            });
        });        

        this.express.use('/', router);
        this.express.use('/getdatabyid/:id', router);
        this.express.use('/getdatabyurl/:url', router);
        this.express.use('/getdatabyurl/:id/:url', router);
    }
}

export default new App().express;