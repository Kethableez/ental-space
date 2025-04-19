import { afterRender, Component, DestroyRef, ElementRef, HostBinding, HostListener, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fadeInOut } from '@animations/fade.animation';
import { slideUp } from '@animations/slide.animation';
import { ButtonDirective } from '@directives/button.directive';
import { MenuItem } from '@models/menu-item.model';
import { distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
	selector: 'ktbz-header',
	imports: [ButtonDirective],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	animations: [fadeInOut, slideUp]
})
export class HeaderComponent {
	public readonly trapScroll = output<boolean>();
	public readonly isHeaderTransparent = input<boolean>(true);
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
		if (this.menuState()) {
			document.body.classList.add('scroll-trap');
		} else {
			document.body.classList.remove('scroll-trap');
		}
		this.trapScroll.emit(this.menuState());
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
