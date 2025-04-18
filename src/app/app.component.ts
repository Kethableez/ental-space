import { afterRender, ChangeDetectorRef, Component, ElementRef, signal, viewChild } from '@angular/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeroComponent } from '@sections/hero/hero.component';
import { distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
	selector: 'ktbz-root',
	imports: [HeaderComponent, HeroComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'Ental space';
	hasTransparentBg = signal<boolean>(true);
	scrollEnabled = signal<boolean>(true);

	private scrollableContent = viewChild<ElementRef<HTMLDivElement>>('appWrapper');

	constructor(private readonly cdRef: ChangeDetectorRef) {
		afterRender(() => {
			this.observeScroll$();
		});
	}

	public toggleScroll(toggle: boolean): void {
		this.scrollEnabled.set(!toggle);
	}

	private observeScroll$(): void {
		fromEvent(this.scrollableContent()!.nativeElement!, 'scroll')
			.pipe(
				filter(() => this.scrollEnabled()),
				map((event: Event) => (event.srcElement as Element).scrollTop),
				map((scrollTop) => scrollTop < 32),
				distinctUntilChanged()
			)
			.subscribe((isHeaderTransparent: boolean) => {
				this.hasTransparentBg.set(isHeaderTransparent);
			});
	}
}
