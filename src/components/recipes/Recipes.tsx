import { useContext, useEffect } from "react";
import RecipeContext from "../../store/recipe-context";
import SearchContext from "../../store/search-context";
import AuthContext from "../../store/auth-context";
import "./Recipes.scss";
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';

const Recipes = () => {
  const searchCtx = useContext(SearchContext);
  const recipeCtx = useContext(RecipeContext);
  const authCtx = useContext(AuthContext);

  const render = () => {
    if (recipeCtx.data) {
      recipeCtx.data.map((recc: any) => {
        const searchList = document.querySelector(".recipe__list");

        const markup = `
        <a class="recipe__link" href="#${recc.id}">
            <li class="recipe__item">
              <figure>
                <img
                  src="${recc.image}"
                  alt="chat baker"
                  class="recipe__image"
                />
              </figure>
              <div>
                <h1 class="recipe__header">${recc.title}</h1>
              </div>
            </li>
          </a>
    `;

        searchList?.insertAdjacentHTML("afterbegin", markup);

        return recc;
      });
    } else {
      console.log("err");
    }
  };

  let query = searchCtx.search;

  const searchResults = async function (query: string) {
    try {
      await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`
      ).then((res) => {
        if (res.ok) {
          const ress = res.json();
          ress.then((data) => {
            recipeCtx.rec(data.recipes);
            console.log(data.recipes);
          });
        } else {
          res.json().then((data) => {
            let errMsg = data;

            console.log(errMsg);
          });
        }
      });
      return true;
    } catch (err) {
      alert(err);
    }
  };

  // ensures we make only one call
  useEffect(() => {
    searchResults(query);
  }, [query]); // ignore "include searchResults"  warning

  render();

  const showRecipe = async function () {
    const id = window.location.hash.slice(1);

      const bookmark = () => {
        // togle the state of bookmarked

        // push the recipe to local storage

        
      }

    try {
      const recipeView = document.querySelector(".recipeView");

      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );

      const data = await response.json();

      if (!response.ok) throw new Error(`${data.message} (${response.status})`);

      console.log(data);

      if (response.ok) {

        let { recipe } = data.recipe;
        
        recipe = {
          image: data.recipe.image_url,
          publisher: data.recipe.publisher,
          ing: data.recipe.ingredients,
          id: data.recipe.id,
          link: data.recipe.source_url,
          title: data.recipe.title,
        };
      
        const markup = `
        <figure class="recipeView__fig">
        <img class="recipeView__image" src="${recipe.image}" alt="w"/>
        </figure>
        
        <div class="recipeView__favourite">
        <div class="recipeView__header">ingredients</div>
        <div class="recipeView__icon">${authCtx.isLoggedIn ? '<ion-icon name="heart"></ion-icon>' : 'save <ion-icon name="heart-outline"></ion-icon>'}</div>  
        </div>
        
        <ul class="recipeView__list">
        ${recipe.ing.map((ing: string) => {
          return `
          <li class="recipeView__item">${ing}</li>
          `
        }).join('')}
        </ul>
        
        <div className="recipeView__link">link to the publsiher</div>
        `;
        
        recipeView!.innerHTML = "";
        recipeView?.insertAdjacentHTML("afterbegin", markup);
      }
      // return true;
    } catch (err) {
      console.log(err);
    }
  };

  // to fix multiple calls try clearing hash on click on search in navigation
  window.addEventListener("hashchange", showRecipe);

  return (
    <section className="recipe">
      <div className="recipe__container">
        <div className="recipe__list">
         
        </div>
        <div className="recipeView">
         
        </div>
      </div>
    </section>
  );
};

export default Recipes;
