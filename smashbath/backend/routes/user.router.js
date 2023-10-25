const { Router } = require("express");
const {userModel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const { model } = require("mongoose");

const userRoute=Router();

