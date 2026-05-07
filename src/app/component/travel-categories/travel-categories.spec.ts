import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCategories } from './travel-categories';

describe('TravelCategories', () => {
  let component: TravelCategories;
  let fixture: ComponentFixture<TravelCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
