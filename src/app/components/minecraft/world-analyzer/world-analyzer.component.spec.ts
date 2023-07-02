import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorldAnalyzerComponent} from './world-analyzer.component';

describe('WorldAnalyzerComponent', () => {
  let component: WorldAnalyzerComponent;
  let fixture: ComponentFixture<WorldAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorldAnalyzerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WorldAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
