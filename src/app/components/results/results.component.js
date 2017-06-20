import controller from './results.controller';
import style from './results.scss';
import template from './results.html';

const results = {
  bindings: {
    showingResults: '<?',
  },
  template,
  controller,
  style,
};

export default results;
