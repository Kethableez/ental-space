import { afterRender, Component, DestroyRef, ElementRef, signal, viewChild } from '@angular/core';
import { starConfig } from '@consts/star-config.const';
import { TextHighlightDirective } from '@directives/text-highlight.directive';
import { environment } from '@env/environment';
import { Star } from '@models/star.model';

@Component({
	selector: 'ktbz-hero',
	imports: [TextHighlightDirective],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss'
})
export class HeroComponent {
	public canvasEl!: HTMLCanvasElement;
	public ctx!: CanvasRenderingContext2D;
	public readonly starCanvas = viewChild<ElementRef<HTMLCanvasElement>>('star');
	public readonly starsEnabled = signal(environment.starsEnabled);
	private stars!: Star[];
	private width!: number;
	private height!: number;
	private readonly starConfig = starConfig;

	constructor(private readonly destroyRef: DestroyRef) {
		afterRender(() => {
			if (this.starsEnabled()) {
				this.animateStars();
			}
		});
	}

	private animateStars(): void {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.stars = this.makeStars(100);
		this.canvasEl = (this.starCanvas() as any).nativeElement as HTMLCanvasElement;
		this.canvasEl.width = this.width;
		this.canvasEl.height = this.height;
		this.ctx = (this.canvasEl as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
		this.createStars();
		this.run();
		this.observeWidthChange();
	}

	private run(): void {
		setTimeout(() => {
			this.updatePosition();
			this.createStars();
			window.requestAnimationFrame(() => this.run());
		}, 30);
	}

	private updatePosition(): void {
		this.stars.forEach((star: Star) => {
			if (star.x + star.radius + 10 < 0) {
				star.x = this.width + star.radius + 10;
			}

			star.x -= star.speed;
		});
	}

	private makeStars(initCount = 150): Star[] {
		const stars: Star[] = [];
		for (let j = 0; j < 3; j++) {
			const conf = this.starConfig.get(j + 1);
			for (let i = 0; i < initCount; i++) {
				stars.push({
					x: Math.random() * this.width,
					y: Math.random() * this.height,
					radius: (Math.random() * 1.5 + 0.5) * conf?.sizeMultiplier!,
					alpha: Math.random(),
					delta: (Math.random() * 0.002 + 0.0005) * (Math.random() < 0.5 ? -1 : 1),
					speed: conf?.speed!
				});
			}
		}
		return stars;
	}

	private createStars(): void {
		this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
		const channelColor = 200;
		this.stars.forEach((star: Star) => {
			this.ctx.beginPath();
			this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
			this.ctx.fillStyle = `rgba(${channelColor}, ${channelColor}, ${channelColor}, ${star.alpha})`;
			this.ctx.shadowBlur = 10;
			this.ctx.shadowColor = '#bb86fc';
			this.ctx.fill();
			star.alpha += star.delta;
			if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
		});
	}

	private observeWidthChange(): void {
		const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const { inlineSize, blockSize } = entries[0].borderBoxSize[0];
			this.width = inlineSize;
			this.height = blockSize;
			if (this.canvasEl.width !== this.width) {
				this.canvasEl.width = this.width;
				this.canvasEl.height = this.height;
			}
		});
		observer.observe(document.body);

		this.destroyRef.onDestroy(() => observer.disconnect());
	}
}
