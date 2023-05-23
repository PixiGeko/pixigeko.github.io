import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodaProjectsComponent } from './coda-projects.component';

describe('CodaProjectsComponent', () => {
  let component: CodaProjectsComponent;
  let fixture: ComponentFixture<CodaProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodaProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodaProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
