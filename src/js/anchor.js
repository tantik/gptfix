import {Initiate, Bind, Listener} from './core';

const d = document;
const ls = localStorage;
const LOCAL_STORAGE_ID = 'anchorId';

const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
const scrollIntoView = ($$) => {
	window.scrollTo({
		top: $$.getBoundingClientRect().top + window.pageYOffset,
		left: 0,
		behavior: 'smooth'
	});
};

@Initiate()
export class Anchor {

	@Bind('loadTrigger') pageLoaded = false;
	@Bind('loadTrigger') polyfillLoaded = false;
	needPolyfill = !('scrollBehavior' in d.documentElement.style);

	constructor() {
		this.loadPolyfill();
	}

	@Listener(window, 'load')
	load() {
		this.pageLoaded = true;
	}

	loadPolyfill() {
		if (this.needPolyfill) {
			// load polyfill
			import(/* webpackChunkName: "smoothscroll-polyfill" */ 'smoothscroll-polyfill').then((module) => {
				this.polyfillLoaded = true;
				module.polyfill();
			});
		}
	}

	loadTrigger() {
		const isReady = this.pageLoaded && (this.polyfillLoaded || !this.needPolyfill);

		if (isReady) {
			const id = ls.getItem(LOCAL_STORAGE_ID);
			if (id) {
				// remove item and scrollIntoView
				ls.removeItem(LOCAL_STORAGE_ID);
				setTimeout(() => scrollIntoView(d.getElementById(id)), 300);
			}
		}
	}

	@Listener(d, 'click')
	handleEvent(event) {
		const $target = event.target.closest('[data-anchor]');
		if (!$target) return;

		const data = $target.getAttribute('data-anchor');

		if ($target.href) {
			// save to ls
			event.preventDefault();
			ls.setItem(LOCAL_STORAGE_ID, data);
			window.location.assign($target.href);
		} else {
			// jumping
			data === '' ? scrollToTop() : scrollIntoView(d.getElementById(data));
		}
	}

}
