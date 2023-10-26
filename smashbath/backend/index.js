const express=require("express");
const {connection}=require("./config/db");
const {authMiddleWare}=require("./Authentication/auth")
const app=express();
const cors=require("cors")
require("dotenv").config();


app.use(express.json());

const {userRoute}=require("./routes/user.router");

app.use(cors())
app.get("/new",async(req,res)=>{

    try {
        res.send("Welcome to Smashbath")
    } catch (error) {
        console.log(error)
    }
    
});


app.use("/user",userRoute)
app.use(authMiddleWare);

app.get("/enter",(req,res)=>{
    res.send("Welcome after login")
})

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at port ${process.env.port}`);
})