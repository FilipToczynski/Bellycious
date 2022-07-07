import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Recipes from "./components/Recipes/Recipes";

function App() {
  return (
    <React.Fragment>
      <Navigation />
     <Recipes />
    </React.Fragment>
  );
}

export default App;
