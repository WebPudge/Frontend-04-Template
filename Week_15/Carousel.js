import { Component, STATE, ATTRIBUTES } from './yang';
import { enableGesture } from './gesture';
import { Animation, Timeline } from './animation';
import { ease } from './cubicBezier';

export { STATE, ATTRIBUTES } from './yang';

export default class Carousel extends Component {
  constructor() {
    super();
  }

  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (const imgSrc of this[ATTRIBUTES].src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${imgSrc.img}')`;
      this.root.appendChild(child);
    }

    const timeline = new Timeline();
    timeline.start();
    let children = this.root.children;

    this[STATE].position = 0;

    let handler = null;
    enableGesture(this.root);

    let t = 0;
    let ax = 0;
    this.root.addEventListener('start', event => {
      timeline.pause();
      clearInterval(handler);

      let progress = (Date.now() - t) / 500;
      ax = ease(progress) * 500 - 500;
    });
    this.root.addEventListener('tap', () => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTES].src[this[STATE].position],
        position: this[STATE].position,
      });
    });
    this.root.addEventListener('pan', event => {
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 500)) / 500;
      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = ((pos % children.length) + children.length) % children.length;
        children[pos].style.transition = 'none';

        // -pos*500 回到相对位置
        // offset*500 偏移量
        // x%500 移动剩余距离，500一张图片超过了就换下一张图片了所以需要取余
        children[pos].style.transform = `translateX(${
          -pos * 500 + offset * 500 + (x % 500)
        }px)`;
      }
    });

    this.root.addEventListener('end', event => {
      timeline.reset();
      timeline.start();
      handler = setInterval(nextPicture, 3000);
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 500)) / 500;

      let direction = Math.round((x % 500) / 500);

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = ((pos % children.length) + children.length) % children.length;

        timeline.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * 500 + offset * 500 + (x % 500),
            -pos * 500 + offset * 500 + direction * 500,
            500,
            0,
            ease,
            v => `translateX(${v}px)`
          )
        );
      }
      this[STATE].position = current - direction;
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length;
      this.triggerEvent('change', { position: this[STATE].position });
    });

    let nextPicture = () => {
      let nextIndex = (this[STATE].position + 1) % children.length;

      let current = children[this[STATE].position];
      let next = children[nextIndex];

      t = Date.now();

      timeline.add(
        new Animation(
          current.style,
          'transform',
          -this[STATE].position * 500,
          -500 - this[STATE].position * 500,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
      );
      timeline.add(
        new Animation(
          next.style,
          'transform',
          500 - nextIndex * 500,
          -nextIndex * 500,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
      );
      this[STATE].position = nextIndex;
      this.triggerEvent('change', { position: this[STATE].position });
    };
    handler = setInterval(nextPicture, 3000);

    return this.root;
  }
}
