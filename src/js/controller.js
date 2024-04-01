import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './Views/recipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/////////////////////////////////////////

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // rendering
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
    console.log(error);
  }
}
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
