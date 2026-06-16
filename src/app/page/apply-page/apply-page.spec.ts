import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPage } from './apply-page';

describe('ApplyPage', () => {
  let component: ApplyPage;
  let fixture: ComponentFixture<ApplyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
