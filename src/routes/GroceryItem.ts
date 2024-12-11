import express from 'express';
import {addGroceryItem, deleteGroceryItem, listInventory, updateGroceryItem, updateInventory} from '../controllers/GroceryItem';
import { authenticate, isAdmin } from '../middleware/AuthMiddleware';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();


router.post('/add/grocery', authenticate,isAdmin,addGroceryItem)
router.put('/update/grocery/:id',authenticate,isAdmin, updateGroceryItem)
router.delete('/delete/grocery/:id',authenticate,isAdmin, deleteGroceryItem)
router.put('/inventory/update/grocery/:id',authenticate,isAdmin, updateInventory)
router.get('/inventory/grocery/list',authenticate,isAdmin, listInventory)

export = router;
