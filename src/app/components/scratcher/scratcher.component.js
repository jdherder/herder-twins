import controller from './scratcher.controller';
import style from './scratcher.scss';
import template from './scratcher.html';

const scratcher = {
  bindings: {
    config: '<',
  },
  template,
  controller,
  style,
};

export default scratcher;
