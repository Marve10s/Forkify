import View from './View';
import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const btnLeft = `<button data-goto=${
      curPage - 1
    } </" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;

    const btnRight = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
    <span>Page ${curPage + 1}</span>
  </button>`;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `${btnRight}`;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${btnLeft}`;
    }
    // Other page
    if (curPage < numPages) {
      return `${btnLeft} ${btnRight}`;
    }

    // Page 1,and there are NO pages
    return '';
  }

  _generateMarkupBtnLeft() {
    return ``;
  }
}

export default new paginationView();
