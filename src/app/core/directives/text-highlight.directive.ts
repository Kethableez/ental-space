import { Directive, HostBinding, input, InputSignal } from '@angular/core';
import { parseColor } from '@functions/parse-color.fn';

@Directive({ selector: '[ktbzTextHighlight]' })
export class TextHighlightDirective {
	public readonly color: InputSignal<string> = input<string>('primary-300');

	@HostBinding('style.color') get colorName(): string {
		return parseColor(this.color());
	}
}
