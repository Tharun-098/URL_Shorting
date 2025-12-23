import express from 'express';
import linkRouter from './router/linkRoutes.js';
import cors from "cors"
const app=express();
const allowedOrigins=["http://localhost:5173","https://url-shorting-jdip.vercel.app"];
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
    methods:["GET","POST","DELETE"]
}))
app.use(express.json());


app.use('/',linkRouter);

  //app.all(/.*/, (req, res) => {
  //res.status(404).sendFile(
   // path.join(__dirname, "views", "error.html")
  //);
//});

export default app;