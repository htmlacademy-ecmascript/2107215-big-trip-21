import AbstractView from '../framework/view/abstract-view.js';

const getSortItem = ({type, isChecked, isDisabled}) =>
  `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        data-sort-type="${type}"
        ${(isChecked) ? 'checked' : ''}
        ${(isDisabled) ? 'disabled' : ''}
      >
      <label
        class="trip-sort__btn"
        for="sort-${type}">${type}
      </label>
    </div>
  `;

const createSortTemplate = (sortItems) =>
  `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems.map((item) => getSortItem(item)).join('')}
    </form>
  `;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortItems = [];

  constructor({onSortTypeChange, items}) {
    super();
    this.#sortItems = items;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortItems);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
