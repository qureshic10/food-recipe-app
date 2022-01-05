import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

const App = () => {
  const [query, setquery] = useState("");
  const [recipes, setRecipes] = useState([]); // We will add receipes data to this useState array. Currently it is empty.
  const [alert, setAlert] = useState("");

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";
  // ES6 template strings use backtick quotes
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await axios.get(url);
      // As per the API, if the result.data.more property is false it means there is no data so we can show the alert message.
      if (!result.data.more) {
        return setAlert("No Food with the searched name are found");
      }
      setRecipes(result.data.hits); // to get the access of recipes array because recipes data is available under hits.

      // console.log(result);
      setAlert(""); // to hide the alert message we need to make it empty so that it can update the state.
      setquery(""); // to make the text field empty after search, we need to update the state of query.
    } else {
      setAlert("Please enter something to search food");
    }
  };

  // to maintain the state of the query text field
  const onChange = (e) => setquery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault(); // to avoid reloading page.
    getData();
  };
  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {/* Show alert only when the state of the alert is not empty */}
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          onChange={onChange}
          value={query}
          autoComplete="off"
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {/* Every component should have a unique key for quick rendering so we will set a key for each rendered component */}
        {/* To generate unique key we will install a package 
        npm i uuid  */}
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
