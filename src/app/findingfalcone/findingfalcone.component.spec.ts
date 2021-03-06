
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA, Injector } from '@angular/core';
import { FindingfalconeComponent } from 'src/app/findingfalcone/findingfalcone.component';
import { FormsModule, NgModel } from '@angular/forms';

type IResultRec = { title: string, nodes: Array<{ title: string, node: any }>, component: FindingfalconeComponent }

const testJson: any = require('./findingfalcone.component.json');
const testData: any = testJson.Data;

const uiResultNodes: Array<IResultRec> = new Array<IResultRec>(testData.length);
for (let i: number = 0; i < testData.length; i++) {
  const testTitle: string = (testData[i].TestCaseTitle !== undefined) ? testData[i].TestCaseTitle : 'TestCase: ' + (i + 1);
  uiResultNodes[i] = { title: testTitle, nodes: new Array<{ title: string, node: any }>(), component: null };
}

fnDoTest();

let nGlobalIndex: number = 0;

function fnCreateFakeVehicleList(oVehicleList) {

  // Fill from json
  const oFakeVehicleList = [];
  for (let nVehicle = 0; nVehicle < oVehicleList.length; nVehicle++) {
    const oVehicle = { name: oVehicleList[nVehicle].name, total_no: oVehicleList[nVehicle].totalNumber, max_distance: oVehicleList[nVehicle].maxDistance };
    oFakeVehicleList.push(oVehicle);
  }
  return oFakeVehicleList;
}

function fnTestExpects(oCompiledElement, component, testObject) {
  let vehicleElements = oCompiledElement.getElementsByClassName('inputCls');
  expect(component.sPlanet).toBe(testObject.sInput);
  
  let domElements = oCompiledElement.children;
  expect(domElements.length).toBe(testObject.nElements);
}

function fnDoTest(): void {
  for (let i: number = 0; i < testData.length; i++) {
    describe((i + 1 + '. ' + uiResultNodes[i].title), () => {

      let component: FindingfalconeComponent;
      let fixture: ComponentFixture<FindingfalconeComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientModule, FormsModule],
          declarations: [FindingfalconeComponent],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(FindingfalconeComponent);
        component = fixture.componentInstance;
        uiResultNodes[i].component = component;

        component.oVehicleList = fnCreateFakeVehicleList(testData[i].FakeData.oVehicleList);
        component.oPlanetList = testData[i].FakeData.oPlanetList;
        component.sDummy = [];


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

        //Initial expects
        fnTestExpects(compiledElement,component, testData[i].InitialExpects);

        //Simulating ngModelChange
        let vehicleElement = compiledElement.getElementsByClassName('inputCls')[0] as HTMLInputElement;
        vehicleElement.value = testData[i].UIActions.inputValue;
        vehicleElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(()=>{
          fnTestExpects(compiledElement, component, testData[i].ActionExpects);
          console.log(component.sPlanet);
        });
        done();
      });

      afterAll(() => {
        //expect.DisplaySummary(bCallFromMyself, nGlobalIndex, testData, prefix, uiResultNodes);
      });
    });
  }
}