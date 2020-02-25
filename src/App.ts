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
            res.json({message: 'Two Available Routes: /getdatabyid/:id, and /getdatabyurl/:url'});
        });

        router.get('/getdatabyid/:id', (req, res) => {            
            this.borrowerInfoManager.getBorrowerInfo(req.params['id']).then(val => {
                res.json({message: val});
            });
        });

        router.get('/getdatabyurl/:url', (req, res) => {            
            this.genericInfoManager.getGenericInfo(req.params['url']).then(val => {
                res.json({message: val});
            });
        });

        this.express.use('/', router);
        this.express.use('/getdatabyid/:id', router);
        this.express.use('/getdatabyurl/:url', router);
    }
}

export default new App().express;