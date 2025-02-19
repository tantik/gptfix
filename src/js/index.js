import "../styles/index.scss";
import './core/polyfill';
import {boot} from './core/boot';
import { Anchor } from './anchor';
import { Lazy } from './lazy';
import './main';
import './menu';
import './slide-showe';

boot.init([
	{ module: Lazy },
	{ module: Anchor }
]);
