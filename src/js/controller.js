import * as model from './model';
import 'core-js/stable';
import recipeView from './Views/recipeView';
import searchView from './Views/searchView';
import resultsView from './Views/resultsView';

if (model.hot) {
  model.hot.accept();
}
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

async function controlSearchResults() {
  try {
    // console.log(resultsView);
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
  } catch (error) {
    console.log(error);
  }
}
controlSearchResults();

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
