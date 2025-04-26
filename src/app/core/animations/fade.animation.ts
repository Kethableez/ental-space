import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(-100%)' }),
		animate('350ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
	]),
	transition(':leave', [animate('350ms ease-in-out', style({ opacity: 0, transform: 'translateY(-100%)' }))])
]);

export const shrink = trigger('shrink', [
	transition(':enter', [style({ opacity: 0, width: 0 }), animate('200ms ease-in-out', style({ opacity: 1, width: '100%' }))]),
	transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0, width: 0 }))])
]);
