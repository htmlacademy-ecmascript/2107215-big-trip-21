import {createElement} from '../render.js';
import {DATE_FORMAT} from '../const.js';
import {humanizeTaskDueDate, humanizeTaskDueDate2} from '../utils.js';

// const deadlineClassName = isTaskExpired(dueDate)
//     ? 'card--deadline'
//     : '';

function createPointTemplate(task) {
  const {type, price, dataTime} = task

  const difference = (dataTime.end - dataTime.start);
  const differenceTimeH = humanizeTaskDueDate2(difference, DATE_FORMAT.hour);
  const differenceTimeM = humanizeTaskDueDate2(difference, DATE_FORMAT.minute);
  const dateStart = humanizeTaskDueDate(dataTime.start, DATE_FORMAT.hourMinute);
  const dateEnd = humanizeTaskDueDate(dataTime.end, DATE_FORMAT.hourMinute);
  // const differenceTimeH = humanizeTaskDueDate(dateEnd - dateStart);
  console.log(differenceTimeH)
  const dateMonth = humanizeTaskDueDate(dataTime.end, DATE_FORMAT.monthDay);

  const havedifferenceTimeH = differenceTimeH > 0
    ? `${differenceTimeH}H `
    : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dataTime.start}">${dateMonth}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dataTime.start}">${dateStart}</time>
              &mdash;
            <time class="event__end-time" datetime="${dataTime.end}">${dateEnd}</time>
          </p>
          <p class="event__duration">${havedifferenceTimeH}${differenceTimeM}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
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
}

export default class PointView {
  constructor({task = BLANK_POINT}) {
    this.task = task;
  }

  getTemplate() {
    return createPointTemplate(this.task);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
