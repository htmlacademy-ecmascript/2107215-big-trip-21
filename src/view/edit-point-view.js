import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate, createToUpperCase } from '../utils/utils.js';
import { DATE_FORMAT, POINT_EMPTY } from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createOfferSelectorTemplate = (offers, point) =>
  offers.map((item) => {
    const isChecked = point.offers.includes(item.id);
    const checked = isChecked ? 'checked' : '';

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${item.id}" type="checkbox" name="${item.id}" ${checked}>
        <label class="event__offer-label" for="${item.id}">
        <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
        </label>
      </div>
    `;
  }).join('');

const createElementPictures = (pictures) =>
  `${(pictures) ?
    `<div class="event__photos-tape">
    ${(pictures).map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  ).join('')}
      </div>`
    : ''}`;

const createTypesListTemplate = (offerTypes, type) => {
  const offerType = (offerTypes.length === 0) ? '' :
    offerTypes.map((item) => (
      `<div class="event__type-item">
        <input
          id="event-type-${item.type}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item.type}"
          ${(item.type === type) ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${createToUpperCase(item.type)}</label>
      </div>`)).join('');

  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
            ${offerType}
      </div>
    </div>
  `;
};

const createPointEditTemplate = ({ point = POINT_EMPTY, pointDestination, pointOffers }) => {
  const { dateFrom, dateTo, type, basePrice } = point;
  const offersByType = pointOffers.find((item) => item.type === type).offers;
  const currentDestination = pointDestination;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
        ${createTypesListTemplate(pointOffers, type)}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DATE_FORMAT.FULL_DATA)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DATE_FORMAT.FULL_DATA)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createOfferSelectorTemplate(offersByType, point)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>
            <div class="event__photos-container">
              ${createElementPictures(currentDestination.pictures)}
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
};

export default class EditPointView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;
  #pointDestination = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;
  #datepicker = null;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, pointDestination, onFormSubmit, onCloseClick, onDeleteClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));

    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#pointDestination = pointDestination;

    this._restoreHandlers();

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#inputDestinationChangeHandler);

    const eventTypes = this.element.querySelectorAll('.event__type-input');
    eventTypes.forEach((element) =>
      element.addEventListener('change', this.#typeChangeHandler)
    );

    const eventOffers = this.element.querySelectorAll('.event__offer-checkbox');
    eventOffers.forEach((element) =>
      element.addEventListener('change', this.#offerChangeHandler)
    );

    this.#setDatepicker();
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value, offers: []
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState(
      {offers: checkedBoxes.map((item) => item.id)}
    );
  };

  #inputDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#pointDestinations.find((item) => item.name === evt.target.value);

    if(!selectedDestination) {
      return;
    }

    this.#pointDestination = selectedDestination;
    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    if (this._state.dateFrom) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this.element.querySelectorAll('.event__input--time').
        forEach((item, index) => {
          if(index === 0) {
            this.#datepicker = flatpickr(
              item,
              {
                dateFormat: 'd/m/y H:i',
                defaultDate: this._state.dateFrom,
                onChange: this.#dateFromChangeHandler,
              },
            );
          } else {
            this.#datepicker = flatpickr(
              item,
              {
                dateFormat: 'd/m/y H:i',
                defaultDate: this._state.dateTo,
                onChange: this.#dateToChangeHandler,
              });
          }
        });
    }
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };
}

