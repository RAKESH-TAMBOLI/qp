import {Request,Response} from "express";
import GroceryItem from "../models/GroceryItem";
import Order from "../models/Order";

// @desc   Create new order
// @route  POST /api/order/create
// @access public
const createOrder = async(req:Request,res:Response) =>{
    try{
        const {userId,items} = req.body

        let totalAmount = 0

        //check inventory and calculate total amount
        for(let item of items){
            const groceryItem = await GroceryItem.findById(item.groceryItemId);
            
            if(!groceryItem){
                return res.status(404).json({
                    message:`Item not found ${item.groceryItemId}`
                })
            }
            if(groceryItem.quantity < item.quantity){
                return res.status(400).json({
                    message:`Insufficient stock for item ${groceryItem.name}`
                })
            }
            totalAmount += groceryItem.price * item.quantity;
        }
        
        // Deduct intentory and save order
        const orderItems = []
        for(let item of items){
            const groceryItem = await GroceryItem.findById(item.groceryItemId);
            if(groceryItem){
                //Deduct stock
                groceryItem.quantity -= item.quantity
                await groceryItem.save()

                //Push order item
                orderItems.push({
                    groceryItemId:item.groceryItemId,
                    name:groceryItem.name,
                    price:groceryItem.price,
                    quantity:item.quantity
                });
            }
        }

        //Create and save the order
        const order = new Order({
            userId,
            items:orderItems,
            totalAmount
        })
        await order.save()
        
        res.status(200).json({
            success:true,
            order,
            message:"Order created successfully"
        });

    }catch(error){
        res.status(500).json({error:error})
    }
}


// @desc   Update order By Id
// @route  POST /api/order/update/:id
// @access Private
const updateOrderStatus = async(req:Request,res:Response) =>{
    try{
        const {id} = req.params;
        const {status} = req.body
        const order = await Order.findById(id);
        if(!order){
            return res.status(200).json({
                message:"Order not found"
            });
        }

        order.status = status
        await order.save()

        res.status(200).json({
            success:true,
            order,
            message:"Order status updated successfully"
        });

    }catch(error){
        res.status(500).json({error:error})
    }
}

export {createOrder,updateOrderStatus}