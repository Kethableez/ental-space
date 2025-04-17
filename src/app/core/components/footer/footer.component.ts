import { Component } from '@angular/core';
import { ButtonDirective } from '@directives/button.directive';
import { IconDirective } from '@directives/icon.directive';
import { Link } from '@models/link.model';

@Component({
	selector: 'ktbz-footer',
	imports: [IconDirective, ButtonDirective],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss'
})
export class FooterComponent {
	protected readonly links: Link[] = [
		{
			label: 'LinkedIn',
			icon: 'linkedin-logo',
			url: ''
		},
		{
			label: 'X',
			icon: 'x-logo',
			url: ''
		},
		{
			label: 'Youtube',
			icon: 'youtube-logo',
			url: ''
		},
		{
			label: 'Facebook',
			icon: 'facebook-logo',
			url: ''
		}
	];
}
