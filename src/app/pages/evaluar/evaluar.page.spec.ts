import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarPage } from './evaluar.page';

describe('EvaluarPage', () => {
  let component: EvaluarPage;
  let fixture: ComponentFixture<EvaluarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
