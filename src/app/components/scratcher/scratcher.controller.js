import constants from '../../app.constants';

const scratchImg = require('../../../images/scratch2.png');

export default class RevealController {
  constructor($element, $timeout, analyticsService) {
    this.$element = $element;
    this.$timeout = $timeout;
    this.analyticsService = analyticsService;
  }

  $onInit() {
    this.defaultSize = 250;
    this.size = parseInt(this.config.size || this.defaultSize);

    this.containerStyle = {
      width: this.size + 'px',
      height: this.size + 'px',
    };

    /* boundary image can be sized the same as container (250), will be scaled up */
    this.boundaryImg = this.config.boundaryImg || null;

    this.boundaryImgStyle = {
      width: parseInt(this.size * 1.7) + 'px',
      height: parseInt(this.size * 1.7) + 'px',
    };
  }

  $postLink() {
    this.initRevealCard();
  }

  initRevealCard() {
    this.isDrawing = false;
    this.lastPoint = null;

    this.revealInfo = this.$element[0].querySelector('.reveal-info');
    this.canvas = this.$element[0].querySelector('.reveal-canvas');

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();
    this.image.src = scratchImg;
    this.image.onload = this.onImgLoad.bind(this);

    this.brush = new Image();
    this.brush.src = constants.brushImgSrc;

    /* add event listeners */
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    this.canvas.addEventListener('touchstart', this.handleMouseDown.bind(this), false);
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
    this.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this), false);
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
    this.canvas.addEventListener('touchend', this.handleMouseUp.bind(this), false);
  }

  onImgLoad() {
    this.ctx.drawImage(this.image, 0, 0, this.size, this.size);
    this.revealInfo.style.visibility = 'visible';
  }

  handleMouseDown(e) {
    this.isDrawing = true;
    this.lastPoint = this.getMouse(e, this.canvas);
  }

  handleMouseMove(e) {
    if (!this.isDrawing) { return; }

    e.preventDefault();

    const currentPoint = this.getMouse(e, this.canvas);
    const dist = this.distanceBetween(this.lastPoint, currentPoint);
    const angle = this.angleBetween(this.lastPoint, currentPoint);
    let x;
    let y;

    for (var i = 0; i < dist; i++) {
      x = this.lastPoint.x + (Math.sin(angle) * i) - 25;
      y = this.lastPoint.y + (Math.cos(angle) * i) - 25;

      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.drawImage(this.brush, x, y);
    }

    this.lastPoint = currentPoint;
    this.handlePercentage(this.getFilledInPixels(32));
  }

  handleMouseUp() {
    this.isDrawing = false;
  }

  getMouse(e, canvas) {
    let offsetX = 0;
    let offsetY = 0;
    let mx;
    let my;

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;
      } while ((canvas = canvas.offsetParent));
    }

    mx = (e.pageX || e.touches[0].pageX) - offsetX;
    my = (e.pageY || e.touches[0].pageY) - offsetY;

    return { x: mx, y: my };
  }

  distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }

    const pixels = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    const pdata = pixels.data;
    const l = pdata.length;
    const total = (l / stride);
    let count = 0;

    // Iterate over all pixels
    for(let i = count = 0; i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);
  }

  handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;

    if (filledInPixels > 50) {
      this.analyticsService.event('revealed', this.config.id, this.config.text);
    }
  }

}
