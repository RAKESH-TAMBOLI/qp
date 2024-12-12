"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Order_1 = require("../controllers/Order");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const router = express_1.default.Router();
router.post('/create', Order_1.createOrder);
router.put('/update/:id', AuthMiddleware_1.authenticate, AuthMiddleware_1.isAdmin, Order_1.updateOrderStatus);
module.exports = router;
