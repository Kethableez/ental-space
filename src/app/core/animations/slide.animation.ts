import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const slideUp = trigger('slideUp', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(92px)' }),
		animate('150ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
	]),
	transition(':leave', [animate(500, style({ transform: 'translateY(-100px)' }))])
]);

export const slideUpFade = trigger('slideUpFade', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(24px)' }),
		animate('700ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
	]),
	transition(':leave', [animate(250, style({ transform: 'translateY(-40px)' }))])
]);

export const slideSideStagger = trigger('slideSideStagger', [
	transition('* => *', [
		query(
			':enter',
			[
				style({ opacity: 0, transform: 'translateX(64px)' }),
				stagger(75, [animate('150ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))])
			],
			{ optional: true }
		),
		query(':leave', [stagger(75, [animate('150ms ease-in-out', style({ opacity: 0, transform: 'translateX(-64px)' }))])], {
			optional: true
		})
	])
]);
