import { useContext, useEffect } from "react";
import RecipeContext from "../../store/recipe-context";
import SearchContext from "../../store/search-context";
import "./Recipes.scss";

const Recipes = () => {
   const searchCtx = useContext(SearchContext);
   const recipeCtx = useContext(RecipeContext);

   
   
   const id =  window.location.hash.slice(1);
   
   const render = () => {
  console.log(recipeCtx.data)

  const generate = () => {
       
    return (`
    <li>
      <a>
        <figure>
          <img />
        </figure>
        <div>
          <h1>title</h1>
          <p>publisher</p>
          icon here
        </div>
      </a>
    </li>`)
  }

  if (recipeCtx.data) {
    recipeCtx.data.map((recc: any) => {

     const searchList = document.querySelector('.recipeWeek');

     console.log(recc)
     
     const markup = `
     <li>
       <a href="#${recc.link}">
         <figure>
           <img src="${recc.image}"/>
           </figure>
         <div>
         <h1>${recc.title}</h1>
         icon here
         </div>
       </a>
       </li>`
       
       searchList!.insertAdjacentHTML('afterbegin', markup);
       
       return recc;
    })
  } else {
    console.log('err');
  }
  

    }


    console.log(searchCtx.search);  
    let query = searchCtx.search;


  const searchResults = async function (query: string) {
    try {
      await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
       .then((res) => {
        if(res.ok) {
         const ress = res.json();
         ress.then((data) => {
           recipeCtx.rec(data.recipes);
           console.log(data.recipes);
          })
        } else {
          res.json().then((data) => {
            let errMsg = data;
            
            console.log(errMsg);
          })
        }
      })

      
    } catch (err) {
      alert(err)
    }
    
  }
  
  // ensures we make only one call
  useEffect(() => {
    searchResults(query);
  }, [query])
  render();
  const  showRecipe = async function () {
    try {

      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${id}`
        )

        const data = await response.json();

        if (!response.ok) throw new Error (`${data.message} (${response.status})` );

        console.log(data)
        
        const markup = `
        <div>${data}<div>
        `
      }
        
      catch (err) {
        alert(err);
      }
        
      
    } 

   

    window.addEventListener('hashchange', showRecipe)
    
    return (
      <section className="mainView">
      <div className="container">
        <a href="#47749">
          <div className="recipeWeek">
    sss
            </div>
        </a>
        <div className="recipeView">
          {/* create a function that will call api based on id of the recipe from the list above */}
        </div>
      </div>
    </section>
  );
};  

export default Recipes;
