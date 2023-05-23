import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsHomeComponent } from './projets-home.component';

describe('ProjetsHomeComponent', () => {
  let component: ProjetsHomeComponent;
  let fixture: ComponentFixture<ProjetsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
