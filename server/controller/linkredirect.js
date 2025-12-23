import link from "../model/link.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const linkRedirection=async(req,res)=>{
    try {
        const {code}=req.params;
        const linkData=await link.findOne({code});
        console.log(req.method, req.originalUrl);

        if(!linkData){
            return res.status(404).sendFile(path.join(__dirname, "../views/error.html"));
        }
        await link.findByIdAndUpdate(linkData._id,{
            $inc:{clicks:1},
            lastClickedAt:new Date().toISOString()
        })
        return res.status(302).redirect(linkData.url);
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export default linkRedirection;