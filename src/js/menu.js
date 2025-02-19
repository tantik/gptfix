import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock/lib/bodyScrollLock.es6';

const indexPage = document.getElementById('index');
const header = document.getElementById('header');
const hamburgerBtn = document.getElementById('hamburger-btn');
const headerMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');
const logo = document.querySelector('.header__logo');

function mobileMenu() {

	let state = false;

	hamburgerBtn.addEventListener('click', function () {
		if (state === false) {
			openMenu();
		} else {
			closeMenu();
		}
	});

	overlay.addEventListener('click', closeMenu);
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 27 || e.code === 'Escape' || e.code === 'Esc') {
			closeMenu();
		}
	});

	function openMenu() {
		disableBodyScroll(headerMenu);
		headerMenu.classList.add('menu-open');
		headerMenu.style.transition = '.4s';
		overlay.style.display = 'block';
		hamburgerBtn.classList.add('active');
		logo.classList.add('active');
		state = true;
	}

	function closeMenu() {
		enableBodyScroll(headerMenu);
		headerMenu.classList.remove('menu-open');
		hamburgerBtn.classList.remove('active');
		overlay.style.display = 'none';
		logo.classList.remove('active');
		setTimeout(() => {
			headerMenu.style.transition = '';
		}, 300);
		state = false;
	}

}

function navFixed() {

	document.addEventListener('scroll', function () {

		let offset = header.offsetHeight * 1.5;

		setTimeout(() => {
			if (window.scrollY > offset) {
				header.classList.add('fixed');
			} else {
				header.classList.remove('fixed');
			}
		}, 200);

	});

}


if (indexPage) {
	logo.classList.add('gif');
}


navFixed();
mobileMenu();
