import * as model from './model';
import 'core-js/stable';
import recipeView from './Views/recipeView';

const recipeContainer = document.querySelector('.recipe');

/////////////////////////////////////////

export async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // rendering
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
}

init();
