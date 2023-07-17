import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter}from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter)

mongoose.connect("mongodb+srv://sumon0002001:qHgl4X7erh4GSGtq@sumon.oquctql.mongodb.net/recipes")

app.listen(4000, () => {
     console.log("server is running on PORT 4000");
})