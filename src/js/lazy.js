import { Initiate } from './core';

@Initiate()
export class Lazy {

	needPolyfill = !(
		'IntersectionObserver' in window &&
		'IntersectionObserverEntry' in window &&
		'intersectionRatio' in window.IntersectionObserverEntry.prototype
	);

	constructor() {
		this.init();
	}

	init() {
		const $lazyNodes = document.querySelectorAll( '.lazy' );
		if ( this.needPolyfill ) {
			import(/* webpackChunkName: "intersection-observer" */'intersection-observer')
				.then(() => [].forEach.call( $lazyNodes, ($node) => this.getIntersectionObserver( $node )));
		} else {
			[].forEach.call( $lazyNodes, ($node) => this.getIntersectionObserver( $node ));
		}
	}

	getIntersectionObserver( $node ) {

		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach( entry => {
				if ( entry.isIntersecting ) {

					entry.target.hasAttribute( 'data-src' ) ?
						this.replaceSrc( entry ) :
						this.replaceBg( entry );

					observer.disconnect();
				}
			});
		});
		io.observe( $node );

	}

	replaceSrc( entry ) {
		entry.target.src = entry.target.getAttribute( 'data-src' );
	}

	replaceBg( entry ) {
		entry.target.style.backgroundImage = `url(${ entry.target.getAttribute( 'data-bg' ) })`;
	}

}
