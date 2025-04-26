import { booleanAttribute, Directive, HostBinding, input, InputSignal, InputSignalWithTransform } from '@angular/core';
import { parseColor } from '@functions/parse-color.fn';

@Directive({ selector: '[ktbzTextHighlight]' })
export class TextHighlightDirective {
	public readonly color: InputSignal<string> = input<string>('primary-300');
	public readonly gradientFill: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

	@HostBinding('style.color') get colorName(): string {
		return !this.gradientFill() ? parseColor(this.color()) : 'initial';
	}

	@HostBinding('class') get className(): string {
		if (this.gradientFill()) {
			return `text-gradient gradient-${this.color()}`;
		}
		return '';
	}
}
