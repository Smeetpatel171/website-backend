import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import supabase from '../utils/supabase.js'; // Adjust the import path as necessary

const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file || path.extname(file.originalname) !== '.zip') {
    return res.status(400).json({ success: false, message: 'Only .zip files allowed' });
  }

  const newFilename = `${Date.now()}-${file.originalname}`;
  const fileBuffer = fs.readFileSync(file.path);

  const { data, error } = await supabase.storage
    .from('zips')
    .upload(newFilename, fileBuffer, {
      contentType: 'application/zip',
      upsert: false
    });

  fs.unlinkSync(file.path); // delete temp file

  if (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Upload failed', error });
  }

  const publicUrl = `https://nexrfifcymcgnuwslimw.supabase.co/storage/v1/object/public/zips/${newFilename}`;

  res.status(200).json({
    success: true,
    message: 'Uploaded to Supabase!',
    url: publicUrl
  });
});

export default router;
