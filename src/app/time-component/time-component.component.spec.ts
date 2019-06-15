
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA, Injector } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { TimeComponentComponent } from 'src/app/time-component/time-component.component';

type IResultRec = { title: string, nodes: Array<{ title: string, node: any }>, component: TimeComponentComponent }

const testJson: any = require('./time-component.component.unittest.json');
const testData: any = testJson.Data;

const uiResultNodes: Array<IResultRec> = new Array<IResultRec>(testData.length);
for (let i: number = 0; i < testData.length; i++) {
  const testTitle: string = (testData[i].TestCaseTitle !== undefined) ? testData[i].TestCaseTitle : 'TestCase: ' + (i + 1);
  uiResultNodes[i] = { title: testTitle, nodes: new Array<{ title: string, node: any }>(), component: null };
}

fnDoTest();

let nGlobalIndex: number = 0;

function fnDoTest(): void {
  for (let i: number = 0; i < testData.length; i++) {
    describe((i + 1 + '. ' + uiResultNodes[i].title), () => {

      let component: TimeComponentComponent;
      let fixture: ComponentFixture<TimeComponentComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientModule],
          declarations: [TimeComponentComponent],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(TimeComponentComponent);
        component = fixture.componentInstance;
        uiResultNodes[i].component = component;

        //Faking service return of time
        spyOn((component as any).utService, 'getTimeTaken').and.callFake(()=>{
          return testData[i].FakeData.sTime;
        });

        fixture.detectChanges();
      });

      it('', (done) => {

        //Increment index counter
        nGlobalIndex++;

        //Test for proper component creation
        expect(component).toBeTruthy();

        let compiledElement: HTMLElement;
        if (environment.production) {
          compiledElement = fixture.nativeElement;
        } else {
          compiledElement = fixture.debugElement.nativeElement;
        }

        //expect time value to be same as what we get from service
        const timeElement = compiledElement.getElementsByClassName('timeTakenCls');
        const timecontent = timeElement[0].textContent;
        expect(timecontent).toContain(testData[i].InitialExpects.sTime);
        done();
      });

      afterAll(() => {
        //expect.DisplaySummary(bCallFromMyself, nGlobalIndex, testData, prefix, uiResultNodes);
      });
    });
  }
}