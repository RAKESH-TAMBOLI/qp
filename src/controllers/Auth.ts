import {Request,Response} from 'express'
import User,{IUser} from '../models/User'
import generateToken from '../library/GenerateToken'



// @desc   Register user and Admin
// @route  POST /api/auth/register
// @access public
const register = async(req:Request,res:Response):Promise<void> =>{
    try{
        const {email,username,password,role} = req.body

        //Check of the user already exists
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(200).json({message:"User already exists"});
            return;
        }

        //Create the new User
        const user:IUser = await User.create({
            email,
            username,
            password,
            role
        });

        res.status(200).json({
            success:true,
            user,
            message:"Registration succesful"
        });



    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}


// @desc   Login user and Admin
// @route  POST /api/auth/login
// @access public
const login = async(req:Request,res:Response):Promise<void> =>{
    try{
        const {email,password} = req.body
        
        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            res.status(200).json({
                success:true,
                user,
                token:generateToken(user),
                message:"Login successfully"
            });
        }else{
            res.status(200).json({message:"Invalid creadentials"})
        }

    }catch(err:any){
        res.status(500).json({error:err.message})
    } 
}

export {register,login}