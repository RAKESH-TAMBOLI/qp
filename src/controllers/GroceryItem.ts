import {Request,Response} from 'express'
import GroceryItem, { IGroceryItem } from '../models/GroceryItem'

// @desc   Add new grocery item
// @route  POST /api/admin/add-grocery
// @access private
const addGroceryItem =async(req:Request,res:Response):Promise<void> => {
    try{
        const {name,price,quantity} = req.body

        //Create the new grocert item
        const newGrocery:IGroceryItem = await GroceryItem.create({
            name,
            price,
            quantity
        });

        res.status(200).json({
            success:true,
            newGrocery,
            message:"Item added successfully"
        });
        
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}

// @desc   View all grocery item
// @route  GET /api/admin/all-grocery
// @access public
const viewGroceryItem =async(req:Request,res:Response):Promise<void> => {
    try{
        const items = await GroceryItem.find();
        
        res.status(200).json({
            success:true,
            items,
        });
        
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}


// @desc   Update grocery item By Id
// @route  PUT /api/admin/grocery/:id
// @access private
const updateGroceryItem =async(req:Request,res:Response):Promise<void> => {
    try{
        const {id} = req.params;

        const updatedItem = await GroceryItem.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            success:true,
            updatedItem,
            message:"Item updated successfully"
        });
        
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}

// @desc   Delete grocery item By Id
// @route  delete /api/admin/grocery/:id
// @access private
const deleteGroceryItem =async(req:Request,res:Response):Promise<void> => {
    try{
        const { id } = req.params;
    await GroceryItem.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Item deleted successfully"
        });
        
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}


// Admin Inventory Management

// @desc   Update Inventory quantity grocery item By Id
// @route  delete /api/admin/inventory/update/grocery/:id
// @access private
const updateInventory = async(req:Request,res:Response) =>{
    try{
        const {id} =req.params;
        const {quantity} = req.body

        const grocertItem = await GroceryItem.findById(id);
        if(!grocertItem){
            return res.status(404).json({
                message:"Grocery item not found"
            });
        }

        grocertItem.quantity = quantity;
        await grocertItem.save()

        res.status(200).json({
            success:true,
            grocertItem,
            message:"Inventory updated successfully"
        })

    }catch(error){
        res.status(500).json({error:error})
    }
}


// @desc   List inventory grocery item
// @route  delete /api/admin/inventory/grocery/list
// @access private
const listInventory = async(req:Request,res:Response) =>{
    try{

        const grocertItems = await GroceryItem.find();

        res.status(200).json({
            success:true,
            grocertItems,
        })

    }catch(error){
        res.status(500).json({error:error})
    }
}


export {addGroceryItem,viewGroceryItem,updateGroceryItem,deleteGroceryItem,updateInventory,listInventory }