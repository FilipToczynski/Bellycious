import React, { useState } from "react";

const RecipeContext = React.createContext({
  data: {} as any,
  rec: (data: any) => {},
  recipeThree: "" as any,
});

export const RecipeContextProvider: React.FC<React.ReactNode> = (
  props: any
) => {
  const [data, setData] = useState("" as any);

  const dataHandle = (recipes: any) => {
    setData(
      recipes.map((recipe: any) => {
        return {
          id: recipe.recipe_id,
          title: recipe.title,
          image: recipe.image_url,
        };
      })
    );
  };

  const contextValue = {
    data: data,
    rec: dataHandle,
    recipeThree: "" as any,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
