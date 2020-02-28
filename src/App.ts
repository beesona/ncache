import * as express from 'express';
import {BorrowerInfoManager } from './managers/BorrowerInfoManager';
import {GenericInfoManager } from './managers/GenericInfoManager';

const path = require('path');

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
            res.sendFile(path.join(__dirname+'/views/index.html'));
        });

        router.get('/getdatabyid/:id', (req, res) => {            
            this.borrowerInfoManager.getBorrowerInfo(req.params['id']).then(val => {
                res.json({message: val});
            });
        });

        router.get('/getdatabyurl/:url', (req, res) => {            
            this.genericInfoManager.getGenericInfo(req.params['url'], req.params['url']).then(val => {
                res.json({message: JSON.parse(val)});
            });
        });

        router.get('/getdatabyurl/:id/:url', (req, res) => {            
            this.genericInfoManager.getGenericInfo(req.params['url'], req.params['id']).then(val => {
                res.json({message: val});
            });
        });        

        router.get('/test', (req, res) => {            
            this.genericInfoManager.testGetAndSet().then(val => {
                res.json({message: val});
            });
        });

        router.post('/set/', (req, res) => {            
            this.genericInfoManager.testGetAndSet().then(val => {
                res.json({message: val});
            });
        });

        this.express.use('/', router);
        this.express.use('/getdatabyid/:id', router);
        this.express.use('/getdatabyurl/:url', router);
        this.express.use('/getdatabyurl/:id/:url', router);
        this.express.use('/test', router);
    }
}

export default new App().express;