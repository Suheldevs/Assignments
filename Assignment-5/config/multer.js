// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')

// const upload_Dir = path.join(__dirname,'../uploads');
// if(!fs.existsSync(upload_Dir)){
//     fs.mkdirSync(upload_Dir,{recursive:true});
// }

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,upload_Dir)
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+'_'+file.originalname)
//     }
// })

// const upload = multer({storage:storage})

// module.exports = upload

// ----------------------Cloudinary -----------------------------

const multer = require('multer')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name:'dlueg7iw9',
    api_key : '178373398849929',
    api_secret:'CjRGwGa9FlgDLWWBGU6VpKuGSoM'
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        allowed_formats:['jpg','png','jpeg','webp'],
    },
});

const upload = multer({storage})

module.exports = upload