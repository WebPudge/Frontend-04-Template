import { linear } from './cubicBezier';

const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATION = Symbol('animation');
const START_TIME = Symbol('start-time');
const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME = Symbol('pause-time');


export class Timeline {
  constructor() {
    this.state = 'inited';
    this[ANIMATION] = new Set();
    this[START_TIME] = new Map();
  }
  start() {
    if(this.state !== 'inited'){
      return;
    }
    this.state = 'started';
    let startTime = new Date();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      const now = new Date();
      for (const animation of this[ANIMATION]) {
        let t;
        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME] - animation.delay;
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        }
        if (animation.duration < t) {
          this[ANIMATION].delete(animation);
          t = animation.duration;
        }
        if(t > 0){
          animation.receive(t);
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }

  pause() {
    if(this.state !== 'started'){
     return
    }

    this.state = 'paused';
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }

  resume() {
    if(this.state !== 'paused'){
      return
     }
 
     this.state = 'started';
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]();
  }

  reset() {
    this.pause();
    this.state = 'inited';
    this[PAUSE_TIME] = 0;
    this[PAUSE_START] = 0;
    this[ANIMATION] = new Set();
    this[START_TIME] = new Map();
    this[TICK_HANDLER] = null;
    this.start();
  }

  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = new Date();
    }
    this[ANIMATION].add(animation);
    this[START_TIME].set(animation, startTime);
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    delay,
    timeFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timeFunction = timeFunction || linear;
    this.template = template || (v => v)
  }
  receive(time) {
    let range = this.endValue - this.startValue;
    let progress = this.timeFunction(time / this.duration)
    this.object[this.property] = this.template(
      this.startValue + range * progress
    );
  }
}
