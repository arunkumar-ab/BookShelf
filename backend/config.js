// config.js
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODBURL = process.env.MONGODBURL || 'mongodb://localhost:27017/mydatabase';
