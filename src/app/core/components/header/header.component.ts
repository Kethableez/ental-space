import { afterRender, ChangeDetectionStrategy, Component, DestroyRef, HostBinding, input, output, signal } from '@angular/core';
import { fadeInOut } from '@animations/fade.animation';
import { slideUp } from '@animations/slide.animation';
import { ButtonDirective } from '@directives/button.directive';
import { MenuItem } from '@models/menu-item.model';

@Component({
	selector: 'ktbz-header',
	imports: [ButtonDirective],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [fadeInOut, slideUp]
})
export class HeaderComponent {
	public readonly trapScroll = output<boolean>();
	public readonly isHeaderTransparent = input<boolean>(true);
	public readonly mobileMenuContentVisible = signal(false);
	public readonly menuState = signal(false);
	public readonly compactNavigation = signal(false);
	public readonly menuItems: MenuItem[] = [
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

	@HostBinding('class.is-transparent') get isTransparent(): boolean {
		return this.isHeaderTransparent();
	}

	constructor(private readonly destroyRef: DestroyRef) {
		afterRender(() => {
			this.observe();
		});
	}

	public toggleMenu(): void {
		this.menuState.set(!this.menuState());
		this.trapScroll.emit(this.menuState());
	}

	public toggleMenuMobileContent(): void {
		this.mobileMenuContentVisible.set(this.menuState() && !this.mobileMenuContentVisible());
	}

	private observe(): void {
		const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const width = entries[0].borderBoxSize[0].inlineSize;
			this.compactNavigation.set(width < 1000);
		});
		observer.observe(document.body);
		this.destroyRef.onDestroy(() => observer.disconnect());
	}
}
