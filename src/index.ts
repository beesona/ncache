import app from './App';
import { resolve } from "path";
import { config } from 'dotenv';

const env = process.env.ENV || 'dev';
config({ path: resolve(__dirname, `../env/.env.${env}`) });
const port = process.env.PORT || 3000;

app.listen(port, (err)=> {
    if (err){
        return console.log(err);           
    }
    return console.log(`server is listening on ${port}`);
});