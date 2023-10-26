const express = require("express")
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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
  const check_mail = await userModel.find({ email });

  if (check_mail.length > 0) {
    return res.status(400).send({ "msg": "User already register please try another mail" })
  }

  bcrypt.hash(password, 5, async (err, hash) => {

    try {
      if (err) {
        res.status(400).send({ "msg": "Error in hashing" });
      }
      else {

        const data = new userModel({ username, email, password: hash });
        await data.save();

        const mailOption = {
          from: '"Smashbath foundation" <rajtupe137@gmail.com>',
          to: email,
          subject: "Welcome to Smashbath",
          text: "Click on this link and login"
        }


        trasporter.sendMail(mailOption, (err, info) => {

          if (err) {
            res.status(400).json({ "msg": err.message })
          } else {
            res.status(200).json({ "msg": "Email sent" })

          }

        })

        res.status(200).send("User register successfully");

      }
    } catch (error) {
      res.status(400).send({ "msg": "User register failed", error })
    }
  })

})



userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email:email });
    if (!user) {
      return res.status(401).json({ msg: "User with this email not found", ok: false })
    }
    const isPasswordSame = await bcrypt.compare(password, user.password)
    
    if (!isPasswordSame) {
      return res.status(401).json({ msg: "Invalid email or password", ok: false })
    }

    //{ userId: user._id } == this is going to encoded into jwt

    const payload={userId:user._id};

    const token = jwt.sign(payload, process.env.secre_key, { expiresIn: '1hr' })
    //const refreshToken = jwt.sign({ userId: user._id }, process.env.refresh_secret, { expiresIn: "3hr" })
    const response = {
      "ok": true,
      "token": token,
      "username":user.username
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ "ok": false, "msg": error.message });
  }
})





module.exports = {
  userRoute
}