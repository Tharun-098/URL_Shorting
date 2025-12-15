import express from 'express';
import linkRouter from './router/linkRoutes.js';

const app=express();

app.use(express.json());

app.use('/',linkRouter);

app.get('/api',(req,res)=>{
    res.send("Api is running successfully")
});

export default app;