import 'intersection-observer';

if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

const gallery = document.querySelectorAll('.gallery');

const fragment = document.createDocumentFragment();

const options = {
	root: null,
	threshold: .1,
};

const callback = function (entries, observer) {

	entries.forEach(entry => {

		if (entry.isIntersecting) {
			animate(entry);
			observer.unobserve(entry.target);
		}
	});

};

const observer = new IntersectionObserver(callback, options);

function animate(entry) {

	const galleryList = entry.target.querySelectorAll('.gallery__list-item-inner');

	galleryList.forEach(item => {

		const galleryItem = item.querySelectorAll('.gallery__list-item-img-wrap');
		let itemWidth = galleryItem[0].clientWidth + parseFloat(getComputedStyle(galleryItem[0]).marginRight);
		let countItem = Math.round(window.innerWidth / itemWidth) * 2;
		let galleryListWidth = itemWidth * countItem;
		item.style.width = galleryListWidth + 'px';
		let translate = 0;

		for (let i = 0; i < countItem; i++) {
			let clonedGalleryItem = item.cloneNode(true);
			clonedGalleryItem.classList.add('duplicate');
			fragment.appendChild(clonedGalleryItem);
		}

		item.appendChild(fragment);
		setTimeout(interval, 1000);

		function interval() {
			setInterval(() => {
				function translateX() {
					if (translate === -itemWidth) {
						translate = 0;
					}
					item.style.transform = `translateX(${translate}px)`;
					translate--;
				}

				window.requestAnimationFrame(translateX);
			}, 45);
		}

		entry.target.classList.add('fade-up');
	});
}


gallery.forEach(el => observer.observe(el));



