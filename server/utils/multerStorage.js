import multer from 'multer'
import fs from 'fs'
const storage = multer.diskStorage({
  destination:  function(req, file, cb) {
    const uploadPath = process.cwd() + '/uploads'
     fs.mkdirSync(uploadPath, {recursive: true})
    console.log(uploadPath)
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' +  file.mimetype.split('/')[1])
  }
})

export const upload = multer({ storage: storage })


