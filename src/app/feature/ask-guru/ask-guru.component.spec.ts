import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskGuruComponent } from './ask-guru.component';

describe('AskGuruComponent', () => {
  let component: AskGuruComponent;
  let fixture: ComponentFixture<AskGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskGuruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
