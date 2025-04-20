import { animate, style, transition, trigger } from '@angular/animations';

export const slideUp = trigger('slideUp', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(128px)' }),
		animate('150ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
	]),
	transition(':leave', [animate(500, style({ transform: 'translateY(-100px)' }))])
]);
