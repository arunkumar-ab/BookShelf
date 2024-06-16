import express from 'express';
import mongoose from 'mongoose'
import {PORT, MONGODBURL} from './config.js'
import router from './routes/booksRoutes.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
mongoose.
    connect(MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error)=>{
        console.error(error);
    });

app.listen(PORT, () => {
    console.log(`App is listening in port: ${PORT}`);
});
app.use('/', router);