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
exports.listInventory = exports.updateInventory = exports.deleteGroceryItem = exports.updateGroceryItem = exports.viewGroceryItem = exports.addGroceryItem = void 0;
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
// @desc   Add new grocery item
// @route  POST /api/admin/add-grocery
// @access private
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, quantity } = req.body;
        //Create the new grocert item
        const newGrocery = yield GroceryItem_1.default.create({
            name,
            price,
            quantity
        });
        res.status(200).json({
            success: true,
            newGrocery,
            message: "Item added successfully"
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addGroceryItem = addGroceryItem;
// @desc   View all grocery item
// @route  GET /api/admin/all-grocery
// @access public
const viewGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield GroceryItem_1.default.find();
        res.status(200).json({
            success: true,
            items,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.viewGroceryItem = viewGroceryItem;
// @desc   Update grocery item By Id
// @route  PUT /api/admin/grocery/:id
// @access private
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedItem = yield GroceryItem_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            updatedItem,
            message: "Item updated successfully"
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updateGroceryItem = updateGroceryItem;
// @desc   Delete grocery item By Id
// @route  delete /api/admin/grocery/:id
// @access private
const deleteGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield GroceryItem_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteGroceryItem = deleteGroceryItem;
// Admin Inventory Management
// @desc   Update Inventory quantity grocery item By Id
// @route  delete /api/admin/inventory/update/grocery/:id
// @access private
const updateInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const grocertItem = yield GroceryItem_1.default.findById(id);
        if (!grocertItem) {
            return res.status(404).json({
                message: "Grocery item not found"
            });
        }
        grocertItem.quantity = quantity;
        yield grocertItem.save();
        res.status(200).json({
            success: true,
            grocertItem,
            message: "Inventory updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.updateInventory = updateInventory;
// @desc   List inventory grocery item
// @route  delete /api/admin/inventory/grocery/list
// @access private
const listInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grocertItems = yield GroceryItem_1.default.find();
        res.status(200).json({
            success: true,
            grocertItems,
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.listInventory = listInventory;
