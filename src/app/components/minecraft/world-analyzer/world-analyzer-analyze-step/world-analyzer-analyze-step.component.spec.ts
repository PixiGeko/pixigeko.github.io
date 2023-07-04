import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorldAnalyzerAnalyzeStepComponent} from './world-analyzer-analyze-step.component';

describe('WorldAnalyzerAnalyzeStepComponent', () => {
  let component: WorldAnalyzerAnalyzeStepComponent;
  let fixture: ComponentFixture<WorldAnalyzerAnalyzeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorldAnalyzerAnalyzeStepComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WorldAnalyzerAnalyzeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
