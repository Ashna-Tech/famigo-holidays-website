import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    // ================= SEO =================

    this.title.setTitle(
      'About Famigo Holidays | Trusted Travel Company'
    );

    this.meta.updateTag({
      name: 'description',
      content:
        'Learn about Famigo Holidays - a trusted travel agency offering domestic and international tour packages at best prices.'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });

    // ================= CANONICAL =================

    const canonicalUrl =
      'https://famigoholidays.com/about';

    let canonicalLink =
      this.document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

    if (!canonicalLink) {

      canonicalLink =
        this.document.createElement('link');

      canonicalLink.setAttribute(
        'rel',
        'canonical'
      );

      this.document.head.appendChild(
        canonicalLink
      );
    }

    canonicalLink.setAttribute(
      'href',
      canonicalUrl
    );
  }
}