import mongoose from 'mongoose';

const linkSchema=new mongoose.Schema({
    url:{type:String,required:true,trim:true},
    code:{type:String,required:true,unique:true,index:true},
    clicks:{type:Number,default:0},
    lastClickedAt:{type:Date,default:null},
},{timestamps:true});

const link=mongoose.models.Link||mongoose.model('Link',linkSchema);

export default link;