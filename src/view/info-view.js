import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils/utils.js';
import { DATE_FORMAT } from '../const.js';

const createInfoTemplate = (travelPoints, manyPoints) => {
  const { destinations, points } = travelPoints;

  const titlePoints = destinations.length ?
    destinations.map((item, index) => {
      let separator = '&mdash;';
      if (manyPoints) {
        separator = '...';
      }

      if(index !== destinations.length - 1) {
        return `${item.name} ${separator} `;
      }

      return item.name;

    }).join('')
    : '';

const getDateInfo = () => {
  if (points.length === 1) {
      const dateA = humanizeDate(points[0].dateFrom, DATE_FORMAT.MONTH_DAY);
      const dateB = humanizeDate(points[0].dateTo, DATE_FORMAT.MONTH_DAY);

    return `${dateA} &mdash; ${dateB}`;
  }

  const datesPoints = points.length ?
      points.map((item, index) => {
        if(index === points.length - 1) {
          return `${humanizeDate(item.dateTo, DATE_FORMAT.MONTH_DAY)}`
        }
        return `${humanizeDate(item.dateFrom, DATE_FORMAT.MONTH_DAY)} &mdash; `;
      }).join('')
      : '';

  return datesPoints;
}

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${titlePoints}</h1>
          <p class="trip-info__dates">${getDateInfo()}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">1230</span>
      </p>
    </section>
  `;
}

export default class InfoView extends AbstractView {
  #travelPoints = [];
  #isManyPoints = false;

  constructor({ travelPoints, isManyPoints }) {
    super();
    this.#travelPoints = travelPoints;
    this.#isManyPoints = isManyPoints;
  }
  get template() {
    return createInfoTemplate(this.#travelPoints,  this.#isManyPoints);
  }
}
