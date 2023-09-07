import he from 'he';
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

const createOfferElementTemplate = (offers, point) => {
  const offerElement = (offers.length === 0) ? '' :
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferSelectorTemplate(offers, point)}
      </div>
    </section>`;
  return offerElement;
};

const createElementPictures = (pictures) =>
  `${(pictures) ?
    `<div class="event__photos-tape">
    ${(pictures).map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  ).join('')}
      </div>`
    : ''}`;

const createDestinationElementTemplate = (destination) => {
  const destinationElement = (!destination) ? '' :

    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
          ${createElementPictures(destination.pictures)}
        </div>
    </section>`;

  return destinationElement;
};

const createDatalistElement = (destinations) => {
  const datalistElement = (destinations.length === 0) ? ''
    : destinations.map((item) =>
      `<option value="${item.name}"></option>`).join('');

  return `
    <datalist id="destination-list-1">
      ${datalistElement}
    </datalist>
  `;
};

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

const createPointEditTemplate = ({ point = POINT_EMPTY, pointDestinations, pointOffers, modeAddForm }) => {
  const { dateFrom, dateTo, type, basePrice, destination } = point;

  const offersByType = pointOffers.find((item) => item.type === type).offers;

  const currentDestination = pointDestinations.find((item) => item.id === destination);

  const valueDestination = (currentDestination)
    ? `${currentDestination.name}`
    : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
        ${createTypesListTemplate(pointOffers, type)}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input
              event__input--destination"
              id="event-destination-1"
              type="text"
              value="${he.encode(valueDestination)}"
              name="event-destination"
              autocomplete="off"
              list="destination-list-1"
              required
            >

            ${createDatalistElement(pointDestinations)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${he.encode(humanizeDate(dateFrom, DATE_FORMAT.FULL_DATA))}"
              data-date-from
              required
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${he.encode(humanizeDate(dateTo, DATE_FORMAT.FULL_DATA))}"
              data-date-to
              required
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              type="number"
              min="1"
              id="event-price-1"
              name="event-price"
              value="${basePrice}"
              autocomplete="off"
              required
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${(modeAddForm) ? 'Cancel' : 'Delete'}</button>

          ${(modeAddForm) ? ''
    : `<button class="event__rollup-btn" type="button">
               <span class="visually-hidden">Open event</span>
            </button>`
}
        </header>
        <section class="event__details">
          ${createOfferElementTemplate(offersByType, point)}
          ${createDestinationElementTemplate(currentDestination)}
        </section>
      </form>
    </li>
  `;
};

export default class EditPointView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;
  #datepicker = null;
  #modeAddForm = null;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseClick, onDeleteClick, mode }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#modeAddForm = mode;
    this._restoreHandlers();

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      modeAddForm: this.#modeAddForm
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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    if (!this.#modeAddForm) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#inputDestinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#inputPriceChangeHandler);

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

  #setDatepicker() {
    const dateStartElement = this.element.querySelector('[data-date-from]');
    const dateEndElement = this.element.querySelector('[data-date-to]');

    this.#datepicker = flatpickr(
      dateStartElement,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        enableTime: true,
        minDate: 'today',
        onChange: this.#dateFromChangeHandler,
        allowInput: true
      },
    );

    this.#datepicker = flatpickr(
      dateEndElement,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        enableTime: true,
        minDate: 'today',
        onChange: this.#dateToChangeHandler,
        allowInput: true
      });
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
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #inputPriceChangeHandler = (evt) => {
    evt.preventDefault();
    const priceValue = evt.target.value;

    if(!Number.isInteger(priceValue)) {
      this.updateElement({
        basePrice: Math.trunc(priceValue),
      });
      return;
    }

    if (priceValue <= 0) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      basePrice: priceValue,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
    this.#modeAddForm = null;
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
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

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint = (state) => {
    const point = {...state};

    return point;
  };
}


