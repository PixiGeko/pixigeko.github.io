import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterProjectsComponent } from './twitter-projects.component';

describe('TwitterProjectsComponent', () => {
  let component: TwitterProjectsComponent;
  let fixture: ComponentFixture<TwitterProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
