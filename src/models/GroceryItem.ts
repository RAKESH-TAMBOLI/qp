import mongoose,{Document,Schema} from "mongoose";


//Define the interface for GroceryItem feilds
export interface IGroceryItem{
    name:string;
    price:number;
    quantity:number;
}

// Extend the IGroceryItem interface to include Mongoose Document properties
export interface IGroceryItemModel extends IGroceryItem,Document{}


//Create the GroceryItem Schema
const GroceryItemSchema:Schema = new Schema<IGroceryItemModel>(
    {
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
},
{timestamps:true}
);

// Export the Grocery model
export default mongoose.model<IGroceryItemModel>("GroceryItem",GroceryItemSchema)