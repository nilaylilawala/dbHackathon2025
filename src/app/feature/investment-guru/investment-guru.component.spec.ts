import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentGuruComponent } from './investment-guru.component';

describe('InvestmentGuruComponent', () => {
  let component: InvestmentGuruComponent;
  let fixture: ComponentFixture<InvestmentGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentGuruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
