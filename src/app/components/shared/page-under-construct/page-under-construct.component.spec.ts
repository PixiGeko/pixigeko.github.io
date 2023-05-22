import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnderConstructComponent } from './page-under-construct.component';

describe('PageUnderConstructComponent', () => {
  let component: PageUnderConstructComponent;
  let fixture: ComponentFixture<PageUnderConstructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUnderConstructComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUnderConstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
