"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const GroceryItem_1 = require("../controllers/GroceryItem");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
// import { Schemas, ValidateJoi } from '../middleware/Joi';
const router = express_1.default.Router();
router.post('/add/grocery', AuthMiddleware_1.authenticate, AuthMiddleware_1.isAdmin, GroceryItem_1.addGroceryItem);
router.put('/update/grocery/:id', AuthMiddleware_1.authenticate, AuthMiddleware_1.isAdmin, GroceryItem_1.updateGroceryItem);
router.delete('/delete/grocery/:id', AuthMiddleware_1.authenticate, AuthMiddleware_1.isAdmin, GroceryItem_1.deleteGroceryItem);
router.put('/inventory/update/grocery/:id', AuthMiddleware_1.authenticate, AuthMiddleware_1.isAdmin, GroceryItem_1.updateInventory);
router.get('/inventory/grocery/list', AuthMiddleware_1.authenticate, AuthMiddleware_1.isAdmin, GroceryItem_1.listInventory);
module.exports = router;
