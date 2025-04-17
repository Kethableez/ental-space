import { Directive, HostBinding, input, InputSignal } from '@angular/core';
import { parseColor } from '@functions/parse-color.fn';

export type IconVariant = 'thin' | 'light' | 'bold' | 'fill' | 'duotone';

@Directive({
	selector: '[ktbzIcon]',
	standalone: true
})
export class IconDirective {
	public name: InputSignal<string> = input.required<string>();
	public variant: InputSignal<IconVariant | null> = input<IconVariant | null>(null);
	public color: InputSignal<string> = input<string>('#0f0f0f');
	public size: InputSignal<number> = input<number>(16);

	@HostBinding('class')
	get iconClass(): string {
		const iconType = this.variant() ? `ph-${this.variant()}` : 'ph';

		return `${iconType} ph-${this.name()}`;
	}

	@HostBinding('style.color')
	get colorClass(): string {
		if (this.color() === 'unset') return '';
		return parseColor(this.color());
	}

	@HostBinding('style.font-size.px')
	get sizeClass(): number {
		return this.size();
	}
}
