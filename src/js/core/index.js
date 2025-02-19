export { Initiate, Listener, Bind, Singleton, State } from './life-cycle';
export { default as Emitter } from './emitter';
export { default as LifeCycle } from './life-cycle';


/**
 * Singleton Class
 */
export class Singleton {
  constructor(className) {
    if (!className._instance) {
      className._instance = this;
    } else {
      return className._instance;
    }
  }
}

/**
 * State Container Class
 */
export class State {
  constructor(container, nextClassState) {
    this.container = container;
    this._nextClassState = nextClassState;
  }

  next() {
    return new this._nextClassState(this.container);
  }
}

/**
 * Bind Decorator
 * @param {string} methodName - The name of the method to bind.
 */
export function Bind(methodName) {
  return function (classPrototype, propertyName, descriptor) {
    if (descriptor.initializer) {
      classPrototype['_' + propertyName] = descriptor.initializer();
    }
    delete descriptor.writable;
    delete descriptor.initializer;
    descriptor.get = function () {
      return this['_' + propertyName];
    };
    descriptor.set = function (value) {
      this['_' + propertyName] = value;
      this[methodName]();
    };
  };
}

/**
 * Initiate Decorator
 * Logs the initiation of a class.
 */
export function Initiate() {
  return function (target) {
    console.log(`Initiating ${target.name}`);
  };
}

export { Emitter, LifeCycle };
