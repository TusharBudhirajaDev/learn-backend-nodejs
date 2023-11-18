import dotenv from 'dotenv';
import Connection_DB from './db/dbConnection.js';


dotenv.config({
    path: './env'
})


Connection_DB()