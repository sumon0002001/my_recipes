import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {UserModel} from '../models/Users.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
    if(user) {
        return res.status(400).json({
            message: "User is already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({username, password: hashedPassword})
    await newUser.save()
    res.json({message: "User register successfully"})


});
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})

    if(!user) {
        return res.status(400).json({
            message: "No user found"
        })
    }

    const isPasswordIsValid = await bcrypt.compare(password, user.password);
    if(!isPasswordIsValid) {
        return res.status(400).json({
            message: "username or password is wrong"
        })
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id})

})

export {router as userRouter}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) 
          return res.sendStatus(403);
        
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };