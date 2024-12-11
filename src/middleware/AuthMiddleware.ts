import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extended Request Interface to include `user` property
interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
}

// Authenticate Token Middleware
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    
    // Check if the Authorization header is present and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Extract the token by removing the "Bearer " prefix
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Attach decoded data (user information) to the request object
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Admin Only Access Middleware
const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || typeof req.user !== "object" || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }
    next();
};

export { authenticate, isAdmin };
