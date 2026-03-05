import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from '../config/token.js'
import uploadOnCloudinary from '../config/cloudinary.js'


export const signup=async (req,res)=>{
  try {
    //input 
    const {userName,password,firstName,lastName,email}=req.body;
    if(!userName || !password || !firstName || !lastName  || !email){
      return res.status(400).json({
        message:"Please fill all details"
      })
    }

    let profileImage;
    if(req.file){
      profileImage=await uploadOnCloudinary(req.file.path);
    }
    console.log(profileImage);

    let userExist=await User.findOne({email});
    //check user exist or not 
    if(userExist){
      return res.status(400).json(
        {message:"User already exist"}
      )
    };

    //password create using bcryptjs
    const hassedPassword= await bcrypt.hash(password,10);

    //crate User
    const user= await User.create({
      firstName,
      lastName,
      email,
      password: hassedPassword,
      userName,
      profileImage
    })

    //token
    let token=generateToken(user._id);

    //cookie
    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENVIRONMENT=="production",
      maxAge:7*24*60*60*1000,
      sameSite:"strict"
    
    })

    return res.status(201).json({
      message:"user Created successfully",
      user:{
      firstName,
      lastName,
      email,
      userName,
      profileImage
      }
    });
    
    
  } catch (error) {
    console.log("error:",error);
    return res.send(500).json({
      message:"Internal server error"
    });
  }
}

export const login=async (req,res)=>{
  try{
    //input
    const {email,userName,password}=req.body
    //check  user exist or not
    let userExist=await User.findOne({email})
    if(!userExist){
      return res.status(400).json({
        message:"user does not exist"
      })
    }
    //if exist  match password
    let matchPassword=await bcrypt.compare(password,userExist.password)
    if(!matchPassword){
      return res.status(400).json({
        message:"password is wrong"
      })
    }

    //token
    let token=generateToken(userExist._id);

    //cookie
    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENVIRONMENT=="production",
      maxAge:7*24*60*60*1000,
      sameSite:"strict"
    
    })

    return res.status(201).json({
      message:"user login successfully",
      user:{
      firstName:userExist.firstName,
      lastName:userExist.lastName,
      email:userExist.email,
      userName:userExist.userName
      }
    });

  }catch(error){
    console.log("error:",error);
    return res.status(500).json({
      message:"internal login server error "
    })
  }
}

export const logout=async (req,res)=>{
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message:"logout Successfully"
    })
  } catch (error) {
    console.log("error:",error);
    return res.status(500).json({
      message:" logout server error "
    })
  }
}