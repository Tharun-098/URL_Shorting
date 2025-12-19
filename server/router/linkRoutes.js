import express from "express";
import createLink from "../controller/create.js";
import linkRedirection from "../controller/linkredirect.js";
import { deleteLink, getAllLinks,getLinkStats } from "../controller/links.js";
import { limiter, linkLimiter } from "../middleware/ratelimit.js";
const linkRouter=express.Router();
linkRouter.get('/',(req,res)=>{
    res.send('API is running');
})
linkRouter.post('/api/create',limiter,createLink);
linkRouter.get('/api/links',getAllLinks);   
linkRouter.get('/api/stats/:code',getLinkStats);
linkRouter.delete('/api/links/:id',deleteLink);   
linkRouter.get('/:code',linkLimiter,linkRedirection);
export default linkRouter;