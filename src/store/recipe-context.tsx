import React, { useState } from "react";

const RecipeContext = React.createContext({
  data: [] as object[],

  pullData: (data: object[]) => {},
});

export const RecipeContextProvider: React.FC<React.ReactNode> = (props) => {
  const [data, setData] = useState([] as object[]);

  interface Recipe {
    recipe_id: string;
    title: string;
    image_url: string;
}

  const dataHandle = ( recipes: Recipe[] ) => {
    setData(
      recipes.map((recipe: { recipe_id: string, title: string, image_url: string }) => {
        return {
          id: recipe.recipe_id as string, 
          title: recipe.title as string,
          image: recipe.image_url as string,
        };
      })
    );
  };

  const contextValue = {
    data: data,
    pullData: dataHandle as () => {},
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
