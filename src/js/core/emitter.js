import { Subject } from 'rxjs';

class Emitter {
  constructor() {
    this.subject = new Subject();
  }

  emit(value) {
    this.subject.next(value);
  }

  subscribe(callback) {
    return this.subject.subscribe(callback);
  }
}

export default new Emitter();
