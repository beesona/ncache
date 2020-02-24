import * as express from 'express';
import {BorrowerInfoManager } from './managers/BorrowerInfoManager';

class App {

    public express
    private borrowerInfoManager: BorrowerInfoManager;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({message: 'Hello World :('});
        });

        router.get('/:ssn', (req, res) => {
            res.json(this.borrowerInfoManager.getBorrowerInfo(req.params['ssn']));
        });

        this.express.use('/', router);
        this.express.use('/:ssn', router);
    }
}

export default new App().express;