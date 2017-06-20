import link from './exampleDirective.link';

export default function () {
  return {
    restrict: 'A',
    link: link,
  };
}