
import { Timeline, Animation} from './animation';
import cubicBezier from './cubicBezier';

let tl = new Timeline();

tl.start();

tl.add(new Animation(document.querySelector('#el').style, 'transform', 0, 500, 2000, 0, cubicBezier.ease, (v) => `translateX(${v}px)`))

document.querySelector('#el2').style.transition = 'ease 2s';
document.querySelector('#el2').style.transform = 'translateX(500px)';

document.querySelector('#pause').addEventListener('click',() => {
  tl.pause();
})

document.querySelector('#resume').addEventListener('click',() => {
  tl.resume();
})


document.querySelector('#reset').addEventListener('click',() => {
  tl.reset();
})