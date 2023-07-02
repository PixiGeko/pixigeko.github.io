import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McProjects} from './mc-projects';

describe('MgdRepositoriesComponent', () => {
  let component: McProjects;
  let fixture: ComponentFixture<McProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McProjects]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
