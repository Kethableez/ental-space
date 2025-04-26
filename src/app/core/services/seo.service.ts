import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root'
})
export class SeoService {
	private readonly env = environment;

	constructor(
		@Inject(DOCUMENT) private readonly dom: Document,
		private readonly title: Title,
		private readonly meta: Meta
	) {}

	public setupSeo(): void {
		this.setTitle();
		this.addMetaTags();
		this.setCanonicalUrl();
	}

	private setTitle(): void {
		this.title.setTitle(this.env.seo.title);
	}

	private addMetaTags(): void {
		this.meta.addTags(this.env.seo.tags);
	}

	private setCanonicalUrl(): void {
		const link: HTMLLinkElement = this.dom.createElement('link');
		link.setAttribute('rel', 'canonical');
		this.dom.head.appendChild(link);
		link.setAttribute('href', environment.canonicalUrl);
	}
}
