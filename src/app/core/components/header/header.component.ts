import {
	afterRender,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DestroyRef,
	HostBinding,
	input,
	output,
	signal
} from '@angular/core';
import { fadeIn, fadeInOut, shrink } from '@animations/fade.animation';
import { slideSideStagger, slideUp } from '@animations/slide.animation';
import { ButtonDirective } from '@directives/button.directive';
import { environment } from '@env/environment';
import { MenuItem } from '@models/menu-item.model';

@Component({
	selector: 'ktbz-header',
	imports: [ButtonDirective],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [fadeInOut, slideUp, slideSideStagger, shrink, fadeIn]
})
export class HeaderComponent {
	public readonly trapScroll = output<boolean>();
	public readonly isHeaderTransparent = input<boolean>(true);
	public readonly mobileMenuContentVisible = signal(false);
	public readonly menuState = signal(false);
	public readonly compactNavigation = signal(false);
	public readonly menuItems: MenuItem[] = environment.menuItems;

	@HostBinding('class.is-transparent') get isTransparent(): boolean {
		return this.isHeaderTransparent();
	}

	constructor(
		private readonly destroyRef: DestroyRef,
		private readonly changeDetectorRef: ChangeDetectorRef
	) {
		afterRender({
			write: () => {
				this.observe();
			}
		});
	}

	public toggleMenu(): void {
		if (this.menuState()) {
			this.mobileMenuContentVisible.set(false);
			return;
		}
		this.menuState.set(!this.menuState());
		this.trapScroll.emit(this.menuState());
	}

	public closeMenuOnAnimationDone(): void {
		if (this.menuState() && !this.mobileMenuContentVisible()) {
			this.menuState.set(!this.menuState());
			this.trapScroll.emit(this.menuState());
		}
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
