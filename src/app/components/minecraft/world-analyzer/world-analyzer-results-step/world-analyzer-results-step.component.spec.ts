import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldAnalyzerResultsStepComponent } from './world-analyzer-results-step.component';

describe('WorldAnalyzerResultsStepComponent', () => {
  let component: WorldAnalyzerResultsStepComponent;
  let fixture: ComponentFixture<WorldAnalyzerResultsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldAnalyzerResultsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldAnalyzerResultsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
