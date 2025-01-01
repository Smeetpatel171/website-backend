import express from 'express';
import { createMail } from '../controllers/mail.controller.js';

const router = express.Router();

router.post('/create', createMail);

export default router;  
