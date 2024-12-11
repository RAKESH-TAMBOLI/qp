import express from 'express';
import {register,login} from '../controllers/Auth';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);

export = router;
