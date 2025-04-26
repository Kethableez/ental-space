import { environmentBase } from './environment.base';

export const environment = {
	...environmentBase,
	canonicalUrl: 'http://localhost:4200/',
	footer: {
		newsletterEnabled: true,
		socialLinksEnabled: true
	}
};
