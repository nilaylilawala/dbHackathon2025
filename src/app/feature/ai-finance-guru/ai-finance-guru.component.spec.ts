import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiFinanceGuruComponent } from './ai-finance-guru.component';

describe('AiFinanceGuruComponent', () => {
  let component: AiFinanceGuruComponent;
  let fixture: ComponentFixture<AiFinanceGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiFinanceGuruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiFinanceGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
