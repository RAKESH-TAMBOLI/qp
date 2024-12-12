"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Authenticate Token Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    // Check if the Authorization header is present and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    // Extract the token by removing the "Bearer " prefix
    const token = authHeader.split(" ")[1];
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach decoded data (user information) to the request object
        req.user = decoded;
        // Proceed to the next middleware
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
// Admin Only Access Middleware
const isAdmin = (req, res, next) => {
    if (!req.user || typeof req.user !== "object" || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }
    next();
};
exports.isAdmin = isAdmin;
