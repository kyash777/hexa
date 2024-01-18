import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import Router from "./routes/route.js";
import Connection from "./database/db.js";

const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/",Router);

app.listen(8000,()=>{
    console.log("server started at port 8000")
})

const url=process.env.MONGODB_URI;
Connection(url)