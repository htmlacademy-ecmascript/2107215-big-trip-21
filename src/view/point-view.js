import { DATE_FORMAT, POINT_EMPTY } from '../const.js';
import { humanizeDate, dateDiff } from '../utils/utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createViewOffersList = (offers) =>
  `
    <ul class="event__selected-offers">
    ${(offers.length !== 0) ?
    `${offers.map((item) =>
      `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`).join('')}`
    : ''}
    </ul>
  `;

const createPointTemplate = ({ point = POINT_EMPTY, pointDestination, pointOffer }) => {
  const { dateFrom, dateTo, type, basePrice, isFavorite } = point;

  const dateStart = humanizeDate(dateFrom, DATE_FORMAT.HOUR_MINUTE);
  const isDiffTime = dateDiff(dateFrom, dateTo);
  const dateEnd = humanizeDate(dateTo, DATE_FORMAT.HOUR_MINUTE);
  const dateMonth = humanizeDate(dateFrom, DATE_FORMAT.MONTH_DAY);
  const getOffers = () => {
    const currentOffers = [];
    for (let i = 0; i <= point.offers.length - 1; i++) {
      const itemOffer = pointOffer.offers.find((item) => item.id === point.offers[i]);
      currentOffers.push(itemOffer);
    }
    return currentOffers;
  };

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${dateMonth}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${dateStart}</time>
              &mdash;
            <time class="event__end-time" datetime="${dateTo}">${dateEnd}</time>
          </p>
          <p class="event__duration">${isDiffTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
          ${createViewOffersList(getOffers())}
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffer = null;
  #handleOpenClick = null;
  #handleFavoriteClick = null;

  constructor({point = POINT_EMPTY, pointDestination, pointOffer, onOpenClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffer = pointOffer;
    this.#handleOpenClick = onOpenClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
