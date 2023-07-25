import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useGetUserID} from '../hooks/useGetUserId';


const SavedRecipes = () => {
   
    const [savedRecipes, setSavedRecipes] = useState([])
    const userID = useGetUserID();

    useEffect(() => {
  
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/recipes/savedRecipes/${userID}`);
          setSavedRecipes(response.data.savedRecipes)
          
          

            
        } catch (error) {
            console.log(error);
            
        }
      }
    
      fetchSavedRecipes()

    }, [])

 

    return (
        <div>
           <h1>Saved Recipes</h1> 
           <ul>
               {savedRecipes?.map((recipe) => (
                   <li key = {recipe._id}>
                       <div>
                           <h2>
                               {recipe.name}
                           </h2>
                       
                         </div>
                         <div className="instructions">
                           <p>{recipe.instructions}</p>
                         </div>
                         <img src={recipe.imageUrl} alt={recipe.name}/>
                          <p>Cooking Time: {recipe.cookingTime} (minute)</p>
                   </li>
    ))}
           </ul>
        </div>
    )
}

export default SavedRecipes;
