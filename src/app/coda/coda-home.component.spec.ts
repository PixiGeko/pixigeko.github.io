import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodaHomeComponent } from './coda-home.component';

describe('CodaHomeComponent', () => {
  let component: CodaHomeComponent;
  let fixture: ComponentFixture<CodaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
