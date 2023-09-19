import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate, createToUpperCase} from '../utils/utils.js';
import {DateFormat, POINT_EMPTY, commonConfig, END_POINT} from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createOfferSelectorTemplate = (offers, point, isDisabled) =>
  offers.map((item) => {
    const isChecked = point.offers.includes(item.id);
    const checked = isChecked ? 'checked' : '';
    const disabled = isDisabled ? 'disabled' : '';

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="${item.id}" type="checkbox" name="${item.id}" ${checked} data-offer-id="${item.id}" ${disabled}>
        <label class="event__offer-label" for="${item.id}">
        <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
        </label>
      </div>
    `;
  }).join('');

const createOfferElementTemplate = (offers, point, isDisabled) => {
  const offerElement = (offers.length === 0) ? '' :
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferSelectorTemplate(offers, point, isDisabled)}
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
  if (!destination) {
    return '';
  }

  const destinationElement = (!destination.description.length && !destination.pictures.length) ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description ?
    `<p class="event__destination-description">${destination.description}</p>`
    : ''}
      ${destination.pictures.length ?
    `<div class="event__photos-container">
          ${createElementPictures(destination.pictures)}
        </div>`
    : ''}
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

const createTypesListTemplate = (offerTypes, type, isDisabled) => {
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
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
            ${offerType}
      </div>
    </div>
  `;
};

const createPointEditTemplate = ({point = POINT_EMPTY, pointDestinations, pointOffers, isNew}) => {
  const {dateFrom, dateTo, type, basePrice, destination, isDisabled, isSaving, isDeleting} = point;

  const offersByType = pointOffers.find((item) => item.type === type).offers;

  const currentDestination = pointDestinations.find((item) => item.id === destination);

  const valueDestination = (currentDestination)
    ? `${currentDestination.name}`
    : '';

  const getCurrentButton = () => {
    if (isNew) {
      return 'Cancel';
    }

    const isDelete = (isDeleting)
      ? 'Deleting...'
      : 'Delete';

    return isDelete;
  };

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="${END_POINT}" method="post"}>
        <header class="event__header">
        ${createTypesListTemplate(pointOffers, type, isDisabled)}

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
              ${isDisabled ? 'disabled' : ''}
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
              value="${he.encode(humanizeDate(dateFrom, DateFormat.FULL_DATA))}"
              data-date-from
              required
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${he.encode(humanizeDate(dateTo, DateFormat.FULL_DATA))}"
              data-date-to
              required
              ${isDisabled ? 'disabled' : ''}
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
              id="event-price-1"
              name="event-price"
              value="${basePrice}"
              min="1"
              autocomplete="off"
              required
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${getCurrentButton()}
          </button>

          ${(isNew) ? ''
    : `<button class="event__rollup-btn" type="button">
               <span class="visually-hidden">Open event</span>
            </button>`
}
        </header>
        <section class="event__details">
          ${createOfferElementTemplate(offersByType, point, isDisabled)}
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
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleResetClick = null;
  #isNew = false;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseClick, onDeleteClick, onResetClick, isNew}) {
    super();
    this._setState(EditPointView.parsePointToState({point}));
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#isNew = isNew;
    this._restoreHandlers();

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleResetClick = onResetClick;
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      isNew: this.#isNew
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState({point}),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    if (this.#isNew) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
    }

    if (!this.#isNew) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
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

    this.#datepickerFrom = flatpickr(
      dateStartElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo,
        allowInput: true
      },
    );

    this.#datepickerTo = flatpickr(
      dateEndElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom,
        allowInput: true
      });
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedBoxes.map((item) => item.dataset.offerId)
    });
  };

  #inputDestinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#pointDestinations.find((item) => item.name === evt.target.value);
    const selectedDestinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    this.updateElement({
      destination: selectedDestinationId
    });
  };

  #inputPriceChangeHandler = (evt) => {
    evt.preventDefault();
    let priceValue = Number(evt.target.value);

    if (priceValue < 0) {
      priceValue = Math.abs(priceValue);
      evt.target.value = priceValue;
    }

    if(!Number.isInteger(priceValue)) {
      priceValue = Math.trunc(priceValue);
      evt.target.value = priceValue;
    }

    this._setState({
      basePrice: priceValue,
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
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  static parsePointToState = ({point}) =>
    ({...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}


