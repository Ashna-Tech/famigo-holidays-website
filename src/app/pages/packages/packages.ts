import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PopularPackages } from '../../component/popular-packages/popular-packages';
import { Subject, takeUntil } from 'rxjs';
import { PACKAGES } from '../../data/packages.data';
import { Package } from '../../models/package.model';


@Component({
  selector: 'app-packages',
  imports: [CommonModule, RouterLink, PopularPackages],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class Packages implements OnInit, OnDestroy {

  // ================= DESTROY SUBJECT =================
  private destroy$ = new Subject<void>();

  // ================= DATA =================
  readonly allPackages: Package[] = PACKAGES;
  filteredPackages: Package[] = [];

  // ================= SELECTED FILTER =================
  selectedType: 'all' | 'domestic' | 'international' | 'honeymoon' | 'religious' = 'all';

  constructor(private route: ActivatedRoute) { }

  // ================= INIT =================
  ngOnInit(): void {

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {

        const type = params.get('type');

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
          item => item.category === this.selectedType
        );
  }

  // ================= TRACK BY =================
  trackByFn(index: number, item: Package): string {
    return item.slug;
  }

  // ================= CLEANUP =================
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}