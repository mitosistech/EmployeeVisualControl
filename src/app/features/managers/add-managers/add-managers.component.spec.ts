import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagersComponent } from './add-managers.component';

describe('AddManagersComponent', () => {
  let component: AddManagersComponent;
  let fixture: ComponentFixture<AddManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
