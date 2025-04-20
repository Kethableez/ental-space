import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from '@directives/button.directive';
import { IconDirective } from '@directives/icon.directive';
import { Link } from '@models/link.model';
import { environment } from '@env/environment';

@Component({
	selector: 'ktbz-footer',
	imports: [IconDirective, ButtonDirective],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	private readonly footerEnv = environment.footer;
	public readonly isNewsletterEnabled = this.footerEnv.newsletterEnabled;
	public readonly links: Link[] = this.footerEnv.socialLinks;
}
