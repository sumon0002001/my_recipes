import express from 'express';
import mongoose from 'mongoose';
import {RecipeModel} from '../models/Recipes.js';
import { UserModel } from "../models/Users.js";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
      const response = await RecipeModel.find({})
      res.status(200).json(response)
  } catch (err) {
      res.json(err)
  }
})

router.post('/', async(req, res) => {
  const recipe = new RecipeModel(req.body);
  try{
    const response = await recipe.save();
    res.json(response);
  } catch(err) {
      res.json(err);
  }
})

router.put("/", async (req, res) => {
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.get("/savedracipes/ids/:userID", async(req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID)
      res.json({savedRecipes: user?.savedRecipes})
        
    } catch (error) {
        res.json(error)
    }
  })

  router.get("/savedRecipes/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const savedRecipes = await RecipeModel.find({
        _id: { $in: user.savedRecipes },
      });
  
      console.log(savedRecipes);
      res.status(201).json({ savedRecipes });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  

export {router as recipesRouter};