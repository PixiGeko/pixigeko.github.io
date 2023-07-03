import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldAnalyzerSettingsStepComponent } from './world-analyzer-settings-step.component';

describe('WorldAnalyzerSettingsStepComponent', () => {
  let component: WorldAnalyzerSettingsStepComponent;
  let fixture: ComponentFixture<WorldAnalyzerSettingsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldAnalyzerSettingsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldAnalyzerSettingsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
