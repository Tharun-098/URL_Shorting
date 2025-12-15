import express from "express";
import createLink from "../controller/create.js";
const linkRouter=express.Router();
linkRouter.post('/api/create',createLink);
export default linkRouter;