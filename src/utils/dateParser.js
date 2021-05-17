import moment from 'moment';

function dateParser(date) {
  const _date = moment(date);
  return _date.startOf('day').fromNow() + " (" + _date.format('MMM Do') + ")"
}

export default dateParser;