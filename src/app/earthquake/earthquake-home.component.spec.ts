import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeHomeComponent } from './earthquake-home.component';

describe('EarthquakeHomeComponent', () => {
  let component: EarthquakeHomeComponent;
  let fixture: ComponentFixture<EarthquakeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarthquakeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarthquakeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
