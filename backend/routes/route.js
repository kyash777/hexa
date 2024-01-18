import express from "express"
const Router=express.Router();
import { Login,Upsorted,Downsorted ,UserData,Signup} from "../controllers/user-controller.js";


Router.post("/login",Login);
Router.post("/signup",Signup);
Router.get("/upsorted",Upsorted)
Router.get("/downsorted", Downsorted);
Router.get("/",UserData);

export default Router;