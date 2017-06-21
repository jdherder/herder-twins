import constants from '../../app.constants';

const scratchImg = require('../../../images/tile.png');

export default class RevealController {
  constructor($element) {
    this.$element = $element;
  }

  $onInit() {
    // this.isDrawing = false;
    // this.lastPoint = null;
    // this.container = this.$element.find('#reveal')[0];
    // this.canvas = this.$element.find('#reveal-canvas')[0];
    // this.revealInfo = this.$element.find('#reveal-info')[0];
    // this.canvasWidth = this.canvas.width;
    // this.canvasHeight = this.canvas.height;
    // this.ctx = this.canvas.getContext('2d');
    // this.image = new Image();
    // this.brush = new Image();
    //
    // this.image.src = scratchImg;
    // this.image.onload = function() {
    //   ctx.drawImage(this.image, 0, 0);
    //   this.revealInfo.style.visibility = 'visible';
    // };
    //
    // this.brush.src = constants.brushImgSrc;
  }

}
