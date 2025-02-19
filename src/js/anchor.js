import smoothscroll from 'smoothscroll-polyfill';
import { Initiate } from './core';

// Инициализация smoothscroll-polyfill
smoothscroll.polyfill();

@Initiate()
export class Anchor {
  
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.addEventListeners();
  }

  addEventListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', this.scrollToTarget.bind(this));
    });
  }

  scrollToTarget(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
