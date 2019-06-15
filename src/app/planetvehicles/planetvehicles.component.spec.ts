
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetvehiclesComponent } from './planetvehicles.component';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
type IResultRec = { title: string, nodes: Array<{ title: string, node: any }>, component: PlanetvehiclesComponent }

const testJson: any = require('./planetVehicles.component.unittest.json');
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

function fnTestExpects(oCompiledElement, testObject) {
  let vehicleElements = oCompiledElement.getElementsByClassName('vehiclesListCls');
  console.log(vehicleElements);
  expect(vehicleElements.length).toBe(testObject.nTotalVehicles);
  for (let vIndex: number = 0; vIndex < vehicleElements.length; vIndex++) {
    const textContent = (vehicleElements[vIndex] as HTMLElement).innerText;
    const expTextContent = testObject.oVehicleListContent[vIndex];
    expect(textContent).toBe(expTextContent);
  }
}

function fnDoTest(): void {
  for (let i: number = 0; i < testData.length; i++) {
    describe((i + 1 + '. ' + uiResultNodes[i].title), () => {

      let component: PlanetvehiclesComponent;
      let fixture: ComponentFixture<PlanetvehiclesComponent>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientModule],
          declarations: [PlanetvehiclesComponent],
          providers: []
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(PlanetvehiclesComponent);
        component = fixture.componentInstance;
        uiResultNodes[i].component = component;

        component.oVehicleList = fnCreateFakeVehicleList(testData[i].FakeData.oVehicleList);
        component.oSelectedPlanet = testData[i].FakeData.oSelectedPlanet;
        component.sDummy = [];

        spyOn((component as any).utService, 'setVehicles').and.callFake(() => { });

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
        fnTestExpects(compiledElement, testData[i].InitialExpects);



        //On click event
        if (testData[i].UIActions.bCanTriggerClick === true) {
          let clickElement = compiledElement.getElementsByClassName('vehiclesListCls')[0].children[0] as HTMLElement;
          clickElement.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            fnTestExpects(compiledElement, testData[i].ActionExpects);
            expect(component.fnVehicles).toHaveBeenCalled();
          });
        }

        done();
      });

      afterAll(() => {
        //expect.DisplaySummary(bCallFromMyself, nGlobalIndex, testData, prefix, uiResultNodes);
      });
    });
  }
}