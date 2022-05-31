import React from "react";
import Navigation from "./components/Navigation/Navigation";

function App() {
  fetch('https://forkify-api.herokuapp.com/api/search?q=pizza')
  .then(response => response.json())
  .then(data => console.log(data));


  return (
    <React.Fragment>
      <Navigation />
    </React.Fragment>
  );
}

export default App;
