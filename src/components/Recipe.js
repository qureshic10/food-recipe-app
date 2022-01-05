import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;
  return (
    <div className="recipe">
      <h2>{label}</h2>
      <img src={image} alt={label} />
      {/* for security purpose we add this rel="noopener noreferrer" */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Details
      </a>
      {/* Toggle button to show the ingredient. We will set the boolean variable show if it is true ingredients will show if it is false they will not show.
      It is simple in react by using the useState hook and toggle the boolean property on button click */}
      <button onClick={() => setShow(!show)}>Ingredients</button>
      {show && <RecipeDetails ingredients={ingredients} />}
    </div>
  );
};

export default Recipe;
