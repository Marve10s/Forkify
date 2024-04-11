import View from './View';

class deleteRecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `Sorry we do not find your recipe! Please try again`;

  addHandlerClick(handler) {
    this._parentElement.addEventListener(
      'click',
      function (event) {
        const btn = event.target.closest('.btn--delete');
        if (!btn) return;

        // Call the handler to delete the recipe
        handler();

        // Hide the recipe element from the DOM
        this._parentElement.style.display = 'none';
        window.location.hash = '';
      }.bind(this)
    );
  }
}

export default new deleteRecipeView();
