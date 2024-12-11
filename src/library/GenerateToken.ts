import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { IUser } from '../models/User'; // Import your user interface if defined

dotenv.config();

const generateToken = (user: any): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION || '1d', // Fallback to 1 day if not set
        }
    );
};

export default generateToken;
