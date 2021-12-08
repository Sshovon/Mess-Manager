const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null,__dirname)
    // },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null, true)
    else
        cb(null, false);
}

const upload = multer({
    storage, fileFilter, limits: {
        fileSize: 1024 * 1024 * 5
    },
});

module.exports = upload;