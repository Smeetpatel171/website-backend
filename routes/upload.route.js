import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure the uploads/zips directory exists
const uploadDir = 'uploads/zips';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer instance with .zip file filter
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.zip') {
      return cb(new Error('Only .zip files are allowed'));
    }
    cb(null, true);
  }
});

// POST /api/upload
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: `/uploads/zips/${req.file.filename}`
  });
});

export default router;
