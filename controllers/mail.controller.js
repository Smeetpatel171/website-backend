import { Mail } from '../models/mail.model.js'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create or use existing user and send email
export const createMail = async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  console.log('CreateMail function called');
  try {
   
    const  mail = new Mail({
        name, email, subject, message
      });
      await mail.save();
    

    // Prepare email templates
    const emailHtmlContentAdmin = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">
        <h2 style="color: #007BFF; text-align: center;">New User Message</h2>
        <p>Dear Admin,</p>
        <p>You have received a new message from a user. Here are the details:</p>
        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">User Name:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Email ID:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Phone Number:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${subject}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Message:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${message}</td>
          </tr>
        </table>
      </div>
    `;

    const emailHtmlContentUser = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; background-color: #f0f0f0;">
        <div style="padding: 20px; border-radius: 10px; text-align: center;">
          <h2 style="color: #007BFF; margin: 10px 0;">Thank you for contacting Smeet Patel</h2>
          <p style="font-size: 16px; margin: 10px 0;">
            Dear ${name},
          </p>
          <p style="font-size: 16px; line-height: 1.5; margin: 10px 0; padding: 0 20px;">
            Thank you for your interest in my work! I look forward to connect with you. I will review your information and contact you shortly.
          </p>
          <p style="margin: 20px 0; color: #6c757d;">
            Regards,<br/>Smeet Patel.
          </p>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Admin
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Connecting New User Message!',
      html: emailHtmlContentAdmin,
    };

    // Send email to Admin
    await transporter.sendMail(mailOptionsAdmin);

    // Email to User
    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Smeet Patel',
      html: emailHtmlContentUser,
    };

    // Send email to User
    await transporter.sendMail(mailOptionsUser);

    return res.status(201).json({ message: 'Message stored and emails sent successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Error handling request', error });
  }
};
