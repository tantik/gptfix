import Emitter from './emitter';

const HOOK_EMITTER = new Emitter();
let moduleId;

/* Module decorator */
export function Initiate(options = {}) {
	moduleId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

	return function (classPrototype) {
		const classInstance = new classPrototype();
		HOOK_EMITTER.emit(`$prepare.module#${moduleId}`, classInstance);

		if (options.onViewInit) {
			onViewIO(classInstance).observe(options.onViewInit);
		}

		return () => (classInstance.init ? classInstance.init() : false);
	};
}

export function Listener(target, eventName) {
	return function (classPrototype, propertyName) {
		HOOK_EMITTER.on(`$prepare.module#${moduleId}`, (instance) => {
			target.addEventListener(eventName, instance[propertyName].bind(instance));
			HOOK_EMITTER.off(`$prepare.module#${moduleId}`);
		});
	};
}

/* OnView - IntersectionObserver init module method onViewInit */
function onViewIO(classInstance) {
	return new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				classInstance.onViewInit();
				observer.disconnect();
			}
		});
	});
}
