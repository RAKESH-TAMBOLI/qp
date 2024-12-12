"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.createOrder = void 0;
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
const Order_1 = __importDefault(require("../models/Order"));
// @desc   Create new order
// @route  POST /api/order/create
// @access public
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, items } = req.body;
        let totalAmount = 0;
        //check inventory and calculate total amount
        for (let item of items) {
            const groceryItem = yield GroceryItem_1.default.findById(item.groceryItemId);
            if (!groceryItem) {
                return res.status(404).json({
                    message: `Item not found ${item.groceryItemId}`
                });
            }
            if (groceryItem.quantity < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for item ${groceryItem.name}`
                });
            }
            totalAmount += groceryItem.price * item.quantity;
        }
        // Deduct intentory and save order
        const orderItems = [];
        for (let item of items) {
            const groceryItem = yield GroceryItem_1.default.findById(item.groceryItemId);
            if (groceryItem) {
                //Deduct stock
                groceryItem.quantity -= item.quantity;
                yield groceryItem.save();
                //Push order item
                orderItems.push({
                    groceryItemId: item.groceryItemId,
                    name: groceryItem.name,
                    price: groceryItem.price,
                    quantity: item.quantity
                });
            }
        }
        //Create and save the order
        const order = new Order_1.default({
            userId,
            items: orderItems,
            totalAmount
        });
        yield order.save();
        res.status(200).json({
            success: true,
            order,
            message: "Order created successfully"
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createOrder = createOrder;
// @desc   Update order By Id
// @route  POST /api/order/update/:id
// @access Private
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = yield Order_1.default.findById(id);
        if (!order) {
            return res.status(200).json({
                message: "Order not found"
            });
        }
        order.status = status;
        yield order.save();
        res.status(200).json({
            success: true,
            order,
            message: "Order status updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.updateOrderStatus = updateOrderStatus;
