const express=require('express')
const router = express.Router();
const upload =require('../middleware/fileHelper');
const {readFileSync}=require('fs');
const path=require('path');
const auth=require("../middleware/auth")



router.post('/image',[auth,upload.single('file')],async (req,res)=>{
    try{
        const image = {
            fileName:req.file.originalname,
            filePath:req.file.path,
            fileType:req.file.mimetype,
            fileSize:fileFormater(req.file.size),
            data:readFileSync(path.join(__dirname+'/../../'+req.file.path))
        }
        req.user.image=image;
        await req.user.save();
        res.send({
            result:"success",
            image
        })
    }catch(e){
        const error=e.message
        res.send({
            error
        })
    }
})




const fileFormater=(bytes,decimal)=>{
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   const dm=decimal || 2
   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2).toFixed(dm) + ' ' + sizes[i];
}

module.exports=router;