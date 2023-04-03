import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatanalyzerComponent } from './datanalyzer.component';

describe('DatanalyzerComponent', () => {
  let component: DatanalyzerComponent;
  let fixture: ComponentFixture<DatanalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatanalyzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatanalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
