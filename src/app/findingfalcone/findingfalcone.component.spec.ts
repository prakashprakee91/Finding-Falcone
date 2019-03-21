import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingfalconeComponent } from './findingfalcone.component';

describe('FindingfalconeComponent', () => {
  let component: FindingfalconeComponent;
  let fixture: ComponentFixture<FindingfalconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingfalconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingfalconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
