import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPackages } from './popular-packages';

describe('PopularPackages', () => {
  let component: PopularPackages;
  let fixture: ComponentFixture<PopularPackages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularPackages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularPackages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
