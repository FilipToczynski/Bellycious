import { useContext, useEffect } from "react";
import RecipeContext from "../../store/recipe-context";
import SearchContext from "../../store/search-context";
import "./Recipes.scss";

const Recipes = () => {
  const searchCtx = useContext(SearchContext);
  const recipeCtx = useContext(RecipeContext);

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
    try {
      const recipeView = document.querySelector(".recipeView");

      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );

      const data = await response.json();

      if (!response.ok) throw new Error(`${data.message} (${response.status})`);

      console.log(data);

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
      <div class="recipeView__hero">
            <figure class="recipeView__image">
              <img class="recipeView__image" src="${recipe.image}" alt="w"/>
            </figure>
          </div>
            <div class="recipeView__favourite">
              <div class="recipeView__header">ingredients</div>
              <div class="recipeView__icon">icon</div>
            </div>
        <div class="recipeView__list">
          ${recipe.ing.map((ing: string) => {
            return `<li>${ing}</li>`
          })}
        </div>
        <div className="recipeView__link">link to the publsiher</div>
      `;

      recipeView!.innerHTML = "";
      recipeView?.insertAdjacentHTML("afterbegin", markup);
      return true;
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
          {/* <a className="recipe__link" href="#38512">
            <li className="recipe__item">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="chat baker"
                  className="recipe__image"
                />
              </figure>
              <div>
                <h1 className="recipe__header">titleasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd</h1>
              </div>
            </li>
          </a> */}
        </div>
        <div className="recipeView">
          {/* <div className="recipeView__hero">
            <figure className="recipeView__image">
              <img className="recipeView__image" src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="w"/>
            </figure>
          </div>
            <div className="recipeView__favourite">
              <div className="recipeView__header">ingredients</div>
              <div className="recipeView__icon">icon</div>
            </div>
        <div className="recipeView__list">
          <ul>
            <li>cilantro</li>
            <li>cilantro</li>
            <li>cilantro</li>
          </ul>
        </div>
        <div className="recipeView__link">link to the publsiher</div> */}
        </div>
      </div>
    </section>
  );
};

export default Recipes;
