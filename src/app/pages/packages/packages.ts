import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { PopularPackages } from '../../component/popular-packages/popular-packages';
import { Subject, takeUntil } from 'rxjs';
import { PACKAGES } from '../../data/packages.data';
import { Package } from '../../models/package.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-packages',
  imports: [CommonModule, RouterLink],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class Packages implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  readonly allPackages: Package[] = PACKAGES;

  filteredPackages: Package[] = [];

  selectedType:
    | 'all'
    | 'domestic'
    | 'international'
    | 'honeymoon'
    | 'religious' = 'all';

  constructor(
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    // Set the initial package type synchronously.
    // This is important during Angular prerendering.
    this.setSelectedType(this.route.snapshot.paramMap.get('type'));

    // Update SEO and packages immediately for the initial route.
    this.updateSeo();
    this.updateCanonical();
    this.applyFilter();

    // Keep route changes working normally in the browser.
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {

        const type = params.get('type');

        this.setSelectedType(type);

        this.updateSeo();
        this.updateCanonical();
        this.applyFilter();

      });
  }

  private setSelectedType(type: string | null): void {

    if (
      type === 'domestic' ||
      type === 'international' ||
      type === 'honeymoon' ||
      type === 'religious'
    ) {
      this.selectedType = type;
    } else {
      this.selectedType = 'all';
    }
  }

  private updateSeo(): void {

    const seoData: Record<
      'all' | 'domestic' | 'international' | 'honeymoon' | 'religious',
      {
        title: string;
        description: string;
      }
    > = {

      all: {
        title: 'Holiday Packages | Famigo Holidays',
        description:
          'Explore domestic, international, honeymoon and religious tour packages with Famigo Holidays.'
      },

      domestic: {
        title: 'Domestic Tour Packages | Famigo Holidays',
        description:
          'Explore domestic tour packages across India with Famigo Holidays. Discover family holidays, couple trips and popular destinations at affordable prices.'
      },

      international: {
        title: 'International Tour Packages | Famigo Holidays',
        description:
          'Explore international holiday packages with Famigo Holidays. Discover exciting destinations, family vacations, honeymoon trips and customized international tours.'
      },

      honeymoon: {
        title: 'Honeymoon Packages | Famigo Holidays',
        description:
          'Discover romantic honeymoon packages with Famigo Holidays. Explore beautiful destinations, couple holidays and memorable honeymoon trips.'
      },

      religious: {
        title: 'Religious Tour Packages | Famigo Holidays',
        description:
          'Explore religious tour packages with Famigo Holidays. Plan spiritual journeys, temple tours, pilgrimage trips and religious holidays across India.'
      }

    };

    const seo = seoData[this.selectedType];

    this.title.setTitle(seo.title);

    this.meta.updateTag({
      name: 'description',
      content: seo.description
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });
  }

  private updateCanonical(): void {

    const canonicalPath =
      this.selectedType === 'all'
        ? '/packages'
        : `/packages/${this.selectedType}`;

    const canonicalUrl =
      `https://famigoholidays.com${canonicalPath}`;

    let canonicalLink =
      this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonicalLink) {

      canonicalLink =
        this.document.createElement('link');

      canonicalLink.setAttribute('rel', 'canonical');

      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);
  }

  applyFilter(): void {

    this.filteredPackages =
      this.selectedType === 'all'
        ? this.allPackages
        : this.allPackages.filter(
            item => item.category === this.selectedType
          );

  }

  trackByFn(index: number, item: Package): string {
    return item.slug;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}