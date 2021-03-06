
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA, Injector } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SuccessmessageComponent } from 'src/app/successmessage/successmessage.component';

type IResultRec = { title: string, nodes: Array<{ title: string, node: any }>, component: SuccessmessageComponent }

const testJson: any = require('./successmessage.component.unittest.json');
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

      let component: SuccessmessageComponent;
      let fixture: ComponentFixture<SuccessmessageComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientModule],
          declarations: [SuccessmessageComponent],
          providers: [
            //provide: ActivatedRoute,
            //useValue: {snapshot: {paramMap: {get: {'status': testData[i].FakeData.status}}}}
          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(SuccessmessageComponent);
        component = fixture.componentInstance;
        uiResultNodes[i].component = component;

        //Faking of router param data
        spyOn((component as any).router.snapshot.paramMap, 'get').and.callFake((param) => {
          return testData[i].FakeData[param];
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

        //Test Expects
        //Expecting messasge text to be equal
        const textEle = compiledElement.getElementsByClassName('testClass');
        expect(textEle[0].textContent).toBe(testData[i].InitialExpects.sText);

        //expecting no. of children if success(3 children) else (2)
        expect(compiledElement.children.length).toBe(testData[i].InitialExpects.nChildren);

        //expeting time binded to be correct
        const timeEle = compiledElement.getElementsByClassName('timeClass');
        expect(timeEle[0].textContent).toContain(testData[i].InitialExpects.timeTaken);

        //Expecting planet name to be same if it is binded
        const planetEle = compiledElement.getElementsByClassName('planetClass');
        if (compiledElement.children.length === 2)
          expect(planetEle.length).toBe(0);
        else
          expect(planetEle[0].textContent).toContain(testData[i].InitialExpects.sPlanetName);
        done();
      });

      afterAll(() => {
        //expect.DisplaySummary(bCallFromMyself, nGlobalIndex, testData, prefix, uiResultNodes);
      });
    });
  }
}