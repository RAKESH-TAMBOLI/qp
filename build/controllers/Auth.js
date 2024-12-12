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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const GenerateToken_1 = __importDefault(require("../library/GenerateToken"));
// @desc   Register user and Admin
// @route  POST /api/auth/register
// @access public
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, role } = req.body;
        //Check of the user already exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(200).json({ message: "User already exists" });
            return;
        }
        //Create the new User
        const user = yield User_1.default.create({
            email,
            username,
            password,
            role
        });
        res.status(200).json({
            success: true,
            user,
            message: "Registration succesful"
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.register = register;
// @desc   Login user and Admin
// @route  POST /api/auth/login
// @access public
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user && (yield user.matchPassword(password))) {
            res.status(200).json({
                success: true,
                user,
                token: (0, GenerateToken_1.default)(user),
                message: "Login successfully"
            });
        }
        else {
            res.status(200).json({ message: "Invalid creadentials" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.login = login;
