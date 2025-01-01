import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import mailRoutes from './routes/mail.route.js'
dotenv.config();

//database connection
mongoose  
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDb is connected');
  })
  
  .catch((err) => {
  console.error('MongoDB connection error:', err);
  
});

export default app = express(); 
 
// Use CORS middleware with all routes for both frontend and admin panel.

app.use(cors({
  origin: ["https://stellarmind.ai","http://localhost:3000","http://localhost:3001",'https://betasourceadmin.vercel.app',"https://beta-new.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Additional CORS middleware for https://betasource.tech at route level.
app.use('/api', cors({
  origin: ["https://stellarmind.ai",'http://localhost:3000',,"http://localhost:3001","https://betasourceadmin.vercel.app","https://beta-new.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// Routes
app.use('/api/mail' , mailRoutes)

//error handling middleware.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});