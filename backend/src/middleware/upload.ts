
import multer from 'multer';
import path from 'path';

// Set storage engine (store in `uploads/` folder)
const storage = multer.diskStorage({
  destination: 'uploads/', // Save images in "backend/uploads/"
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// File upload limits
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error('Only images allowed!'));
    }
  },
});

export default upload;
