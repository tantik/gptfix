import Emitter from './emitter';

class LifeCycle {
  constructor() {
    this.emitter = Emitter;
  }

  on(event, callback) {
    this.emitter.subscribe(value => {
      if (value === event) {
        callback();
      }
    });
  }

  emit(event) {
    this.emitter.emit(event);
  }
}

export default new LifeCycle();
