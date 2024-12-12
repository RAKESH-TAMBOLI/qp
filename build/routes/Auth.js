"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
// import { Schemas, ValidateJoi } from '../middleware/Joi';
const router = express_1.default.Router();
router.post('/register', Auth_1.register);
router.post('/login', Auth_1.login);
module.exports = router;
