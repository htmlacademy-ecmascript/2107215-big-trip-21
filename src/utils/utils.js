import dayjs from 'dayjs';

const ALERT_SHOW_TIME = 5000;

const humanizeDate = (date, dataFormat) =>
  date ? dayjs(date).format(dataFormat) : '';

const dateDiff = (date1, date2) => {
  const fromTime = dayjs(date1);
  const toTime = dayjs(date2);
  const diffTime = toTime.diff(fromTime, 'minutes');
  const timeDay = Math.floor(diffTime / 1440);
  const answerH = diffTime - timeDay * 1440;
  const timeHour = Math.floor(answerH / 60);
  const timeMinute = answerH - timeHour * 60;

  let answer = '';

  if (diffTime <= 0) {
    return 'wrong date';
  } else {
    if (timeDay !== 0) {
      answer = `${timeDay.toString().padStart(2, '0')}d `;
    }
    if (timeHour !== 0) {
      answer += `${timeHour.toString().padStart(2, '0')}h ` ;
    }
    if (timeMinute !== 0) {
      answer += `${timeMinute.toString().padStart(2, '0')}m` ;
    }
    return answer;
  }
};

const createToUpperCase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const isDatasEqual = (dateA, dateB) => {
  const pointDateA = dayjs(dateA).valueOf();
  const pointDateB = dayjs(dateB).valueOf();

  return (dateA === null && dateB === null) || (pointDateA === pointDateB);
};

const makeid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const showAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = '9999';
  alertMessage.style.left = 0;
  alertMessage.style.top = 0;
  alertMessage.style.position = 'fixed';
  alertMessage.style.paddingTop = '28px';
  alertMessage.style.paddingBottom = '28px';
  alertMessage.style.width = '100%';
  alertMessage.style.backgroundColor = 'white';
  alertMessage.style.borderRadius = '2px';
  alertMessage.style.border = '3px solid #fd8871';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.textAlign = 'center';
  alertMessage.textContent = message;
  document.body.style.overflow = 'hidden';
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {humanizeDate, dateDiff, createToUpperCase, isDatasEqual, makeid, showAlert};
