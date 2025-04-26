import {
	afterRender,
	booleanAttribute,
	Directive,
	ElementRef,
	HostBinding,
	inject,
	input,
	InputSignal,
	InputSignalWithTransform,
	Renderer2
} from '@angular/core';

@Directive({
	selector: '[ktbzButton]',
	standalone: true
})
export class ButtonDirective {
	public readonly icon: InputSignal<string | null> = input<string | null>(null);
	public readonly iconOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
	public readonly link: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

	@HostBinding('attr.tabindex') private readonly tabindex = 0;
	@HostBinding('attr.role') private readonly role = 'button';

	@HostBinding('class') get composedClass(): string[] {
		const iconOnly = this.iconOnly() ? 'icon-only' : null;

		return ['btn', iconOnly].filter((property) => property).map((property) => property as string);
	}

	private labelNode!: ChildNode;
	private iconNode?: HTMLElement;
	private readonly defaultIconWeight = 'ph-bold';
	protected elementRef = inject(ElementRef);
	protected renderer = inject(Renderer2);

	constructor() {
		afterRender({
			write: () => {
				if (!this.labelNode) {
					this.setup();
					this.setAttributes();
				}

				if (this.iconNode) {
					this.checkIconChange();
				}
			}
		});
	}

	private setup(): void {
		this.removeIconsIfExists();
		this.getButtonLabel();
		this.removeChildrenNodes();
		this.setBorder('top');
		this.setText();
		if (this.icon() && !this.link()) {
			this.applyIcon();
		}
		this.setBorder('bottom');
	}

	private checkIconChange(): void {
		const iconName = Array.from(this.iconNode!.classList.entries())
			.map(([_, className]) => className)
			.filter((className) => className !== this.defaultIconWeight)[0];
		if (iconName !== this.icon()) {
			this.renderer.removeClass(this.iconNode, iconName);
			this.renderer.addClass(this.iconNode, `ph-${this.icon()!}`);
		}
	}

	private getButtonLabel(): void {
		if (!this.labelNode) {
			this.labelNode = this.elementRef.nativeElement.childNodes[0];
		}
	}

	private applyIcon(): void {
		this.insertIcon(this.elementRef.nativeElement.childNodes[1]);
	}

	private insertIcon(parent: any): void {
		this.iconNode = this.createIcon();
		this.renderer.appendChild(parent, this.iconNode);
	}

	private setText(): void {
		if (this.iconOnly() && !this.link()) {
			const content = this.renderer.createElement('div');
			this.renderer.addClass(content, 'btn__content');
			this.renderer.appendChild(this.elementRef.nativeElement, content);
			return;
		} else if (this.link()) {
			const textElement = this.renderer.createElement('span');
			this.renderer.addClass(textElement, 'link__text');

			if (!this.iconOnly()) {
				this.renderer.appendChild(textElement, this.labelNode);
			}

			if (this.icon()) {
				this.insertIcon(textElement);
			}

			this.renderer.appendChild(this.elementRef.nativeElement, textElement);
		} else {
			const content = this.renderer.createElement('div');
			this.renderer.addClass(content, 'btn__content');
			this.renderer.appendChild(content, this.labelNode);
			this.renderer.appendChild(this.elementRef.nativeElement, content);
		}
	}

	private setBorder(side: 'top' | 'bottom'): void {
		const border = this.renderer.createElement('span');
		this.renderer.addClass(border, `btn__${side}-border`);
		this.renderer.appendChild(this.elementRef.nativeElement, border);
	}

	private removeChildrenNodes(): void {
		Array.from(this.elementRef.nativeElement.childNodes).forEach((node) => {
			this.renderer.removeChild(this.elementRef.nativeElement, node);
		});
	}

	private removeIconsIfExists(): void {
		const icons = Array.from((this.elementRef.nativeElement as HTMLElement).getElementsByTagName('i'));
		for (const icon of icons) {
			icon.remove();
		}
	}

	private createIcon(): HTMLElement {
		const iconName = this.icon() || 'user';
		const iconElement = this.renderer.createElement('i') as HTMLElement;
		const iconWeight = this.defaultIconWeight;
		this.renderer.addClass(iconElement, iconWeight);
		this.renderer.addClass(iconElement, `ph-${iconName}`);
		if (this.link() && this.iconOnly()) {
			this.renderer.addClass(iconElement, `pb-05`);
		}
		return iconElement;
	}

	private setAttributes(): void {
		const labelValue = this.labelNode?.nodeValue;
		(this.elementRef.nativeElement as HTMLElement).setAttribute('title', labelValue ?? 'Button');
		(this.elementRef.nativeElement as HTMLElement).setAttribute('aria-label', labelValue ?? 'Button');
	}
}
