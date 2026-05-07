import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PopularPackages } from '../../component/popular-packages/popular-packages';
import { DESTINATIONS_DATA } from '../../data/destinations-data';
import { Subject,takeUntil } from 'rxjs';

interface Destination {
  name: string;
  image: string;
  price: number;
  slug: string;
  category: 'domestic' | 'international' | 'honeymoon' | 'religious';
}

@Component({
  selector: 'app-packages',
  imports: [CommonModule,RouterLink,PopularPackages],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class Packages implements OnInit,OnDestroy {

      // ================= DESTROY SUBJECT =================
  private destroy$ = new Subject<void>();

  // ================= DATA =================
  allPackages: Destination[] = DESTINATIONS_DATA;
  filteredPackages: Destination[] = [];

  // ================= SELECTED FILTER =================
  selectedType: 'all' | 'domestic' | 'international' | 'honeymoon' | 'religious' = 'all';

  constructor(private route: ActivatedRoute) {}

  // ================= INIT =================
  ngOnInit(): void {

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {

        const type = params['type'];

        // ✅ Safe filter handling
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

        this.applyFilter();
      });
  }

  // ================= FILTER FUNCTION =================
  applyFilter(): void {

    this.filteredPackages =
      this.selectedType === 'all'
        ? this.allPackages
        : this.allPackages.filter(
            (item: Destination) => item.category === this.selectedType
          );
  }

  // ================= TRACK BY =================
  trackByFn(index: number, item: Destination): string {
    return item.slug;
  }

  // ================= CLEANUP =================
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}