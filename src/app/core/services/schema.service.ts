import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root'
})
export class SchemaService {
	private readonly env = environment;

	constructor(@Inject(DOCUMENT) private readonly dom: Document) {}

	public setupSchema(renderer: Renderer2): void {
		this.setup(renderer);
	}

	private setup(renderer: Renderer2): void {
		if (!!this.dom.getElementById('json-ld-schema')) {
			return;
		}

		const script: HTMLScriptElement = renderer.createElement('script');
		script.id = 'json-ld-schema';
		script.type = 'application/ld+json';
		script.text = this.createJsonLd();

		renderer.appendChild(this.dom.body, script);
	}

	private createJsonLd(): string {
		const data = {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Ental Space',
			alternateName: ['Ental Space'],
			url: this.env.canonicalUrl,
			logo: 'https://entalspace.com/logo-blk.png',
			description: this.getSeoTagValue('description'),
			'@address': {
				'@type': 'PostalAddress',
				addressLocality: 'Wrocław',
				addressRegion: 'Dolnośląskie',
				addressCountry: 'PL'
			},
			sameAs: ['https://www.linkedin.com/company/ental-space/about/']
		};
		return `${JSON.stringify(data)}`;
	}

	private getSeoTagValue(key: string): string {
		return this.env.seo.tags.filter((tag) => tag.name === key)[0].content;
	}
}
