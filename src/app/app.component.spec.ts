import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));


  it('should create the app and router navigate to have been called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn((component as any).router, 'navigate').and.callFake(()=>{});
    component.ngOnInit();
    
    expect(component).toBeTruthy();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['./findingFalcone']);
  });

  
});
