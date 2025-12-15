import link from "../model/link.js";

const linkRedirection=async(req,res)=>{
    try {
        const {code}=req.params;
        const linkData=await link.findOne({code});
        if(!linkData){
            return res.status(404).json({success:false,message:"Link not found"});
        }
        await link.findByIdAndUpdate(linkData._id,{
            $inc:{clicks:1},
            lastClickedAt:new Date().toISOString()
        })
        return res.redirect(linkData.url);
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export default linkRedirection;