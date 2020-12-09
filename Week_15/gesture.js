export class Listener {
  constructor(element, recognizer) {
    this.isListeningMouse = false;

    this.contexts = new Map();

    element.addEventListener('mousedown', event => {
      let context = Object.create(null);
      this.contexts.set('mouse' + (1 << event.button), context);
      recognizer.start(event, context);
      let mousemove = event => {
        let button = 1;
        while (button <= event.buttons) {
          if (button & event.buttons) {
            let key;
            // 中键和右键相反
            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            } else {
              key = button;
            }
            recognizer.move(event, this.contexts.get('mouse' + key));
          }
          button = button << 1;
        }
      };
      let mouseup = event => {
        recognizer.end(event, this.contexts.get('mouse' + (1 << event.button)));
        if (event.button === 0) {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          this.isListeningMouse = false;
        }
      };

      if (!this.isListeningMouse) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        this.isListeningMouse = true;
      }
    });

    element.addEventListener('touchstart', event => {
      for (const touch of event.changedTouches) {
        let context = Object.create(null);
        this.contexts.set(touch.identifier, context);
        recognizer.start(touch, context);
      }
    });
    element.addEventListener('touchmove', event => {
      for (const touch of event.changedTouches) {
        recognizer.move(touch, this.contexts.get(touch.identifier));
      }
    });
    element.addEventListener('touchend', event => {
      for (const touch of event.changedTouches) {
        recognizer.end(touch, this.contexts.get(touch.identifier));
        this.contexts.delete(touch.identifier);
      }
    });
    element.addEventListener('touchcancel', event => {
      for (const touch of event.changedTouches) {
        recognizer.cancel(touch, this.contexts.get(touch.identifier));
        this.contexts.delete(touch.identifier);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  start(point, context) {
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;
    this.dispatcher.dispatch('start',{
      clientX:point.clientX,
      clientY:point.clientY,
    });

    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ];

    context.handle = setTimeout(() => {
      context.isPan = false;
      context.isTap = false;
      context.isPress = true;
      context.handle = null;
      this.dispatcher.dispatch('press',{});
    }, 500);
  }

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isTap = false;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      this.dispatcher.dispatch('panstart',{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY,
        isVertical: context.isVertical,
      });
      clearTimeout(context.handle);
    }

    if (context.isPan) {
      this.dispatcher.dispatch('pan',{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY,
        isVertical: context.isVertical,
      });
    }

    context.points = context.points.filter(p => Date.now() - p.t < 500);
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    });
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap', {});
      clearTimeout(context.handle);
    }
    if (context.isPress) {
      this.dispatcher.dispatch('pressend', {});
    }
    let d, v;
    if (!context.points.length) {
      v = 0;
    } else {
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      );
      v = d / (Date.now() - context.points[0].t);
    }
    if (v > 1.5) {
      this.dispatcher.dispatch('flick',{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY,
        isVertical: context.isVertical,
        isFlick:context.isFlick,
        velocity: v
      });
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      this.dispatcher.dispatch('panend',{
        startX:context.startX,
        startY:context.startY,
        clientX:point.clientX,
        clientY:point.clientY,
        isVertical: context.isVertical,
        isFlick:context.isFlick
      });
    }
    this.dispatcher.dispatch('end',{
      startX:context.startX,
      startY:context.startY,
      clientX:point.clientX,
      clientY:point.clientY,
      isVertical: context.isVertical,
      isFlick:context.isFlick
    });
  }

  cancel(point, context) {
    this.dispatcher.dispatch('cancel',{});
    clearTimeout(context.handle);
  }
}

export class Dispatcher {
  constructor(element) {
    this.element = element;
  }

  dispatch(type, properties) {
    let event = new Event(type);
    for (const name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

export function enableGesture(element){
  new Listener(element, new Recognizer(new Dispatcher(element)))
}
