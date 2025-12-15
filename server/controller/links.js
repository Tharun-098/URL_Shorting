import link from "../model/link.js"

export const getAllLinks=async(req,res)=>{
    try {
        const links=await link.find({}).sort({createdAt:-1});
        return res.status(200).json({success:true,data:links})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export const getLinkStats=async(req,res)=>{
    try {
        const {code}=req.params;
        const linkData=await link.findOne({code});
        if(!linkData){
            return res.status(404).json({success:false,message:"Link not found"});
        }
        return res.status(200).json({success:true,data:linkData});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export const deleteLink=async(req,res)=>{
    try {
        const {id}=req.params;
        //const linkData=await link.findOne({code});
        await link.findByIdAndDelete(id);
        return res.status(200).json({success:true,message:"Link deleted successfully"});
    } catch (error) {
        
    }
}