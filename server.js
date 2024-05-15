import express from 'express';
import cors from 'cors';
const app = express();
const multer = require('multer');
const corsOptions = {
    origin: 'http://localhost:4400',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.post('/', (response) => {
    response.json("Data received");
    res.send('Data received');
});
