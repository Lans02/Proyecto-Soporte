import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanoPage } from './dano.page';

describe('DanoPage', () => {
  let component: DanoPage;
  let fixture: ComponentFixture<DanoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
