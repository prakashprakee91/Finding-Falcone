import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootcomponentComponent } from './rootcomponent.component';

describe('RootcomponentComponent', () => {
  let component: RootcomponentComponent;
  let fixture: ComponentFixture<RootcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
