import express from 'express';
import linkRouter from './router/linkRoutes.js';
import cors from "cors"
const app=express();
const allowedOrigins=["http://localhost:5174","https://url-shorting-jdip.vercel.app"];
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
    methods:["GET","POST","DELETE"]
}))
app.use(express.json());

app.use('/api',(req,res)=>{
    res.send("Api is running successfully")
});
app.use('/',linkRouter);


export default app;