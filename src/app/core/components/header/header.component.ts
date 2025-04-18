import { afterRender, Component, DestroyRef, ElementRef, HostListener, inject, signal } from '@angular/core';
import { ButtonDirective } from '@directives/button.directive';
import { MenuItem } from '@models/menu-item.model';

@Component({
	selector: 'ktbz-header',
	imports: [ButtonDirective],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	protected compactNavigation = signal(false);
	private readonly destroyRef = inject(DestroyRef);
	protected readonly menuItems: MenuItem[] = [
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

	constructor() {
		afterRender(() => {
			this.observe();
		});
	}

	private observe(): void {
		const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const width = entries[0].borderBoxSize[0].inlineSize;
			this.compactNavigation.set(width < 1000);
		});
		observer.observe(document.body);
		this.destroyRef.onDestroy(() => observer.disconnect());
	}

	private observeScroll(): void {}
}
