import { Component } from '@angular/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeroComponent } from '@sections/hero/hero.component';

@Component({
	selector: 'ktbz-root',
	imports: [HeaderComponent, HeroComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'Ental space';
}
