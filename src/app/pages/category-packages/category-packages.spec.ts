import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPackages } from './category-packages';

describe('CategoryPackages', () => {
  let component: CategoryPackages;
  let fixture: ComponentFixture<CategoryPackages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPackages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPackages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
