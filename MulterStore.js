const multer = require('multer')
const fs = require('fs')
const path = require('path')
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log(file)
        //console.log(req.params.propId)
        const  propId  = req.params.propId
        const dir = `./public/products`

        fs.exists(dir, exist => {
            //console.log(exist)
        if (!exist) {
            console.log("writing")
          return fs.mkdir(dir,{recursive: true},error => cb(error, dir))
        }
        return cb(null, dir)
        })
      },
    filename: (req, file, cb) => {
        let date = Date.now()
        cb(null, date + path.extname(file.originalname)+'.png');
        if(req.image){
            req.image = [...req.image,`/products/${date + path.extname(file.originalname)}.png`]
        }else{
            req.image = [`/products/${date + path.extname(file.originalname)}.png`]
        }
    }
});
const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log(file)
        //console.log(req.params.propId)
        const  propId  = req.params.propId
        const dir = `./public/products`

        fs.exists(dir, exist => {
            //console.log(exist)
        if (!exist) {
            console.log("writing")
          return fs.mkdir(dir,{recursive: true},error => cb(error, dir))
        }
        return cb(null, dir)
        })
      },
    filename: (req, file, cb) => {
        let date = Date.now()
        cb(null, date + path.extname(file.originalname)+'.png');
        if(req.image){
            req.image = [...req.image,`/products/${date + path.extname(file.originalname)}`]
        }else{
            req.image = [`/products/${date + path.extname(file.originalname)}`]
        }
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error("The file is not of image format!"), false);
    }
}


exports.upload_prop = multer({storage: storage2,fileFilter: fileFilter})
exports.upload_prop_ = multer({storage: storage3,fileFilter: fileFilter})
