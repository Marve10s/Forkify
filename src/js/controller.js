import * as model from './model';
import 'core-js/stable';
import recipeView from './Views/recipeView';
import searchView from './Views/searchView';
import resultsView from './Views/resultsView';
import paginationView from './Views/paginationView';

if (model.hot) {
  model.hot.accept();
}
export async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

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
    // 4) Render initial pagination buttons

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}

function controlPagination(goToPage) {
  //  Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //  Render NEW pagination buttons
  paginationView.render(model.state.search);
}
function controlServings(newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}
function controlAddBookmark() {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();
