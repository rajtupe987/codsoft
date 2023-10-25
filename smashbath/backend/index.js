const express=require("express");
const {connection}=require("./config/db");

const app=express();

require("dotenv").config();

const {userRoute}=require("./routes/user.router")

app.get("/new",async(req,res)=>{

    try {
        res.send("Welcome to Smashbath")
    } catch (error) {
        console.log(error)
    }
    
});


app.use("/user",userRoute)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at port ${process.env.port}`);
})