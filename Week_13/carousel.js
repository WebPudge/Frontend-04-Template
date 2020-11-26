import { Component } from './yang';

export class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (const imgSrc of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${imgSrc}')`;
      this.root.appendChild(child);
    }

    let position = 0;
    this.root.addEventListener('mousedown', event => {
      let startX = event.clientX;
      let children = this.root.children;
      let move = event => {
        let x = event.clientX - startX;
        let current = position + (x - (x % 500)) / 500;
        for (const offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = 'none';
          // -pos*500 回到相对位置
          // offset*500 偏移量
          // x%500 移动剩余距离，500一张图片超过了就换下一张图片了所以需要取余
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500 + (x % 500)
          }px)`;
        }
      };
      let up = event => {
        let x = event.clientX - startX;
        position = position - Math.round(x / 500);

        for (const offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = '';
          // -pos*500 回到相对位置
          // offset*500 偏移量
          // x%500 移动剩余距离，500一张图片超过了就换下一张图片了所以需要取余
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500
          }px)`;
        }

        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });

    // let currentIndex = 0;
    // setInterval(() => {
    //   const children = this.root.children;
    //   let nextIndex = (currentIndex + 1) % children.length;

    //   let current = children[currentIndex];
    //   let next = children[nextIndex];

    //   next.style.transition = 'none';
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
    //   setTimeout(() => {
    //     next.style.transition = '';
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`;
    //     currentIndex = nextIndex;
    //   }, 16);
    // },3000);
    return this.root;
  }

  mountTo(parent) {
    parent.appendChild(this.render());
  }
}