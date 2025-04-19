import { animate, style, transition, trigger } from '@angular/animations';

export const slideUp = trigger('slideUp', [
	transition(':enter', [style({ transform: 'translateY(100px)' }), animate(500, style({ transform: 'translateY(0)' }))]),
	transition(':leave', [animate(500, style({ transform: 'translateY(-100px)' }))])
]);
