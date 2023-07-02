import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatassetsDownloadComponent} from './datassets-download.component';

describe('DatassetsDownloadComponent', () => {
  let component: DatassetsDownloadComponent;
  let fixture: ComponentFixture<DatassetsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatassetsDownloadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatassetsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
