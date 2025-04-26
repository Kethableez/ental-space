import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'ktbz-content',
	imports: [CommonModule],
	templateUrl: './content.component.html',
	styleUrl: './content.component.scss'
})
export class ContentComponent {
	public readonly title = input.required<string>();
}
