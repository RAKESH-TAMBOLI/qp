import express from 'express';
import {createOrder,updateOrderStatus} from '../controllers/Order';
import { authenticate, isAdmin } from '../middleware/AuthMiddleware';

const router = express.Router();


router.post('/create', createOrder);
router.put('/update/:id', authenticate,isAdmin,updateOrderStatus);

export = router;
