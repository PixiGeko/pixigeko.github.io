import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgdRepositoriesComponent } from './mgd-repositories.component';

describe('MgdRepositoriesComponent', () => {
  let component: MgdRepositoriesComponent;
  let fixture: ComponentFixture<MgdRepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgdRepositoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MgdRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
