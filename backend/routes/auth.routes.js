import express,{Router} from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js";

const authRouter=express(Router())
authRouter.post('/signup',upload.single("profileImage"),signup);
authRouter.post('/login',login);
authRouter.post('/logout',logout);

export default authRouter