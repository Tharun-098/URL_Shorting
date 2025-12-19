import express from 'express';
import linkRouter from './router/linkRoutes.js';
import cors from "cors"
const app=express();
const allowedOrigins=["http://localhost:5175"];
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
    methods:["GET","POST","DELETE"]
}))
app.use(express.json());

app.use('/',linkRouter);

app.get('/api',(req,res)=>{
    res.send("Api is running successfully")
});

export default app;