import express  from "express";
import {login } from "../Controller/loginController.js";
import register from "../Controller/registerController.js";
import cookieParser from "cookie-parser";
import { awsConf, getPresignedUrl} from "../Controller/awsUpload.js";
const router =express.Router();
router.use(cookieParser())


router.post("/login", login)
router.post('/register',register)
router.get('/getPresignedUrl',getPresignedUrl)
router.get('/aws-config',awsConf)


export default router