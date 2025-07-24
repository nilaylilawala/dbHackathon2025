import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceGuruComponent } from './insurance-guru.component';

describe('InsuranceGuruComponent', () => {
  let component: InsuranceGuruComponent;
  let fixture: ComponentFixture<InsuranceGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceGuruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
