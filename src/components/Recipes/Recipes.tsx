import { useContext, useEffect } from "react";
import RecipeContext from "../../store/recipe-context";
import SearchContext from "../../store/search-context";
import "./Recipes.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { IconContext } from "react-icons";
import React from "react";

const Recipes: React.FC = () => {
  const searchCtx = useContext(SearchContext);
  const recipeCtx = useContext(RecipeContext);

  let query = searchCtx.search;

  interface Recipe {
    id: string;
    title: string;
    image: string;
  }

  const RecipeList = () => {
    if (recipeCtx.data as Recipe[]) {
      recipeCtx.data.map((recipeData: any) => {
        const searchList = document.querySelector(
          ".recipe__list"
        ) as HTMLDivElement;

        const markup = ` 
        <a class="recipe__link" href="#${recipeData.id}">
            <li class="recipe__item animate__animated animate__fadeIn">
              <figure>
                <img
                  src="${recipeData.image}"
                  alt="chat baker"
                  class="recipe__image animate__animated animate__fadeIn"
                />
              </figure>
              <div>
                <h1 class="recipe__header">${recipeData.title}</h1>
              </div>
            </li>
          </a>
    `;
        searchList?.insertAdjacentHTML("afterbegin", markup);
        return recipeData;
      });
    } else {
      console.log("");
    }
  };

  // calls api for with the search query
  const searchResults = async function (query: string) {
    try {
      if (query as string) {
        await fetch(
          `https://forkify-api.herokuapp.com/api/search?q=${query}`
        ).then((res) => {
          if (res.ok) {
            const data = res.json();

            data.then((data: { recipes: object[] }) => {
              recipeCtx.pullData(data.recipes);
              console.log(data.recipes);
            });
          } else if (!res.ok) {
            const searchList = document.querySelector(
              ".recipe__list"
            ) as HTMLDivElement;
            searchList.innerHTML = `<div class='error'>Can't find recipe for "${query}"!</div>`;
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  RecipeList();

  // ensures we make only one call
  useEffect(() => {
    searchResults(query as string);
    //eslint-disable-next-line
  }, [query]);

  // make api call based on ID from the list
  const RecipeView = async function () {
    const id = window.location.hash.slice(1);

    const recipeView = document.querySelector(".recipeView") as HTMLDivElement;

    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );

      const data = await response.json();

      if (!response.ok) throw new Error(`${data.message} (${response.status})`);

      if (response.ok) {
        let { recipe } = data.recipe;

        recipe = {
          id: data.recipe.recipe_id,
          image: data.recipe.image_url,
          publisher: data.recipe.publisher,
          ing: data.recipe.ingredients,
          link: data.recipe.source_url,
          title: data.recipe.title,
        };

        const markup = `
        <h1 class="recipeView__title"><span>${recipe.title}</span></h1>
        <figure class="recipeView__fig">
        <img class="recipeView__image" src="${
          recipe.image
        }" alt="done recipe food"/>
        </figure>
        
        <div class="recipeView__header">ingredients</div>
        
        <ul class="recipeView__list">
        ${recipe.ing
          .map((ing: string) => {
            return `
            <li class="recipeView__item"><ion-icon name="checkmark-outline"></ion-icon>${ing}</li>
            `;
          })
          .join("")}
          </ul>
          
          <a href=${recipe.link} class="recipeView__link" target="_open"> 
          <div>Click here for a full recipe!</div>
          </a>     
         
          `;

        recipeView!.innerHTML = "";
        recipeView?.insertAdjacentHTML("afterbegin", markup);
      }
    } catch (err) {
      console.log(err);
    }
  };

  window.addEventListener("hashchange", RecipeView);

  return (
    <section className="recipe">
      <div className="recipe__container">
        <div className="recipe__list"></div>
        <div className="recipeView">
          <span className="recipeView__message">
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <BiSearchAlt2 />
            </IconContext.Provider>
            Search for keywords like carrot, broccoli, cucumber. full list of
            queries{" "}
            <a
              href="https://forkify-api.herokuapp.com/phrases.html"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Recipes;
