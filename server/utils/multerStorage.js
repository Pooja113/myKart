import multer from 'multer'
import path from 'path';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    
    const uploadPath = path.resolve(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })
