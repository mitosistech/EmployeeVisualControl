import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcompanyComponent } from './selectcompany.component';

describe('SelectcompanyComponent', () => {
  let component: SelectcompanyComponent;
  let fixture: ComponentFixture<SelectcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
