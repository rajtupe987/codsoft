const express=require("express")
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt=require("jsonwebtoken");

require("dotenv").config();

const userRoute = express.Router()

// specifying who is providing service of sending mail his authentication

const trasporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.mail_service,
        pass: process.env.mail_password
    }
});


userRoute.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const check = await userModel.find({ email });

  if (check.length > 0) {
    return res.status(400).json({ "ok": false, "msg": "User already exists" });
  }

  bcrypt.hash(password, 5, async (err, hash) => {
    try {
      if (err) {
        res.send(err.message);
      } else {
                const data = new userModel({ username, email, password: hash });
                await data.save();

        // Create the welcome email
        const mailOptions = {
          from: '"smashbath web application 👻" <rajtupe137@gmail.com>',
          to: email, // Recipient's email address who is going to reacive the mail
          subject: 'Welcome to smashbath foundation', // Subject of the email
          text: 'Thank you for signing up!' // Email message
        };

        // Send the email
        trasporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Email sent:');
          }
        });

        res.status(200).json({ "ok": true, "msg": "Registered Successfully" });
      }
    } catch (error) {
      res.status(400).json({ "ok": false, "msg": error.message });
    }
  });
});


userRoute.post("./signin",async(res,req)=>{
    try {
        const {email, password}=req.body;

        const user=await userModel.find({email:email});


        if(!user){
            res.send({"msg":"User not register please register first."})
        }

        const compare_pass=await bcrypt.compare(password,user.password);

        if(!compare_pass){
            res.send({"msg":"Please enter the correct password."})
        }


        const token=jwt.sign({userId:user._id}, process.env.secre_key, {expiresIn:"1hr"});


        const response={
            "msg":true,
            "token":token
        }

        res.status(200).send(response);

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    userRoute
}