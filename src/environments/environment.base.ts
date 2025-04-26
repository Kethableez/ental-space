const seo = {
	title: "Ental Space - it's all about space and precious resources",
	tags: [
		{
			name: 'description',
			content:
				'We’re enabling in-space manufacturing to create materials impossible to make on Earth—thanks to microgravity and our re-entry capsule.'
		},
		{ name: 'keywords', content: 'Space, Startup, User-friendly, Kethableez' },
		{ name: 'robots', content: 'index,follow' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }
	]
};

const menuItems = [
	{
		label: 'About',
		fragment: '#about',
		icon: 'about-icon'
	},
	{
		label: 'Timeline',
		fragment: '#timeline',
		icon: 'timeline-icon'
	},
	{
		label: 'Crew',
		fragment: '#crew',
		icon: 'crew-icon'
	},
	{
		label: 'Contact us',
		fragment: '#contact',
		icon: 'contact-icon'
	}
];

const socialLinks = [
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
];

export const environmentBase = {
	starsEnabled: false,
	seo,
	menuItems,
	socialLinks
};
