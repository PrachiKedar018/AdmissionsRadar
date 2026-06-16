import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTable } from './application-table';

describe('ApplicationTable', () => {
  let component: ApplicationTable;
  let fixture: ComponentFixture<ApplicationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
