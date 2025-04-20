import { environmentBase } from './environment.base';

export const environment = {
	...environmentBase,
	canonicalUrl: 'http://localhost:4200/',
	footer: {
		newsletterEnabled: true,
		socialLinks: [
			{
				label: 'LinkedIn',
				icon: 'linkedin-logo',
				url: '',
				brandColor: '#0077b5'
			},
			{
				label: 'X',
				icon: 'x-logo',
				url: '',
				brandColor: '#ffffff'
			},
			{
				label: 'Youtube',
				icon: 'youtube-logo',
				url: '',
				brandColor: '#FF0000'
			},
			{
				label: 'Facebook',
				icon: 'facebook-logo',
				url: '',
				brandColor: '#0866FF'
			}
		]
	}
};
