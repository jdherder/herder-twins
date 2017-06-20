import controller from './vote.controller';
import style from './vote.scss';
import template from './vote.html';

const vote = {
  bindings: {
    voteCast: '&?',
    viewResults: '&?',
  },
  template,
  controller,
  style,
};

export default vote;
