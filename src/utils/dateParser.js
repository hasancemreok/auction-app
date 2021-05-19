import moment from 'moment';

function dateParser(date, mode = 0) {
  const _date = moment(date);
  if(mode == 0)
    return _date.startOf('day').fromNow() + " (" + _date.format('MMM Do') + ")"
  else
    return _date.format('MMM Do, HH:mm');
}

export default dateParser;