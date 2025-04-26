import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '@components/content/content.component';
import { ButtonDirective } from '@directives/button.directive';
import { IconDirective } from '@directives/icon.directive';
import { Link } from '@models/link.model';
import { environment } from '@env/environment';

@Component({
	selector: 'ktbz-footer',
	imports: [IconDirective, ButtonDirective, ContentComponent],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	private readonly env = environment;
	public readonly isNewsletterEnabled = this.env.footer.newsletterEnabled;
	public readonly isSocialLinksEnabled = this.env.footer.socialLinksEnabled;
	public readonly links: Link[] = this.env.socialLinks;
}
