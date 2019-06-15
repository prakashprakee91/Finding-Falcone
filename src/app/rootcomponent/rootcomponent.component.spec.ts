
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RootcomponentComponent } from 'src/app/rootcomponent/rootcomponent.component';
import { BehaviorSubject } from 'rxjs';

type IResultRec = { title: string, nodes: Array<{ title: string, node: any }>, component: RootcomponentComponent }

const testJson: any = require('./rootcomponent.component.unittest.json');
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
  expect(component.aPlanets.length).toBe(testObject.aPlanet.length);

  expect(component.aVehicles.length).toBe(testObject.aVehicles.length);
const a = [1,2];
a.unshift(-1);
}


function fnDoTest(): void {
  for (let i: number = 0; i < testData.length; i++) {
    describe((i + 1 + '. ' + uiResultNodes[i].title), () => {

      let component: RootcomponentComponent;
      let fixture: ComponentFixture<RootcomponentComponent>;

      let subPlanet: BehaviorSubject<any>;
      let subVehicles: BehaviorSubject<any>;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientModule],
          declarations: [RootcomponentComponent],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(RootcomponentComponent);
        component = fixture.componentInstance;
        uiResultNodes[i].component = component;

        subPlanet = new BehaviorSubject(testData[i].FakeData.oPlanetList);
        subVehicles = new BehaviorSubject(testData[i].FakeData.oVehicleList);

        //Faking of planet subscription
        if (testData[i].FakeData.bNoPlanetSub !== true)
          (component as any).utService.obsPlanet$ = subPlanet.asObservable();
        else
          (component as any).utService.obsPlanet$ = null;

        //Faking of vehicles subscription
        if (testData[i].FakeData.bNoVehicleSub !== true)
          (component as any).utService.obsVehicles$ = subVehicles.asObservable();
        else
          (component as any).utService.obsVehicles$ = null;
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
        fnTestExpects(compiledElement, component, testData[i].InitialExpects);

        /*Observable related mocking*/
        //Planet obs
        if (testData[i].Observable.bTriggerPlanetObs) {
          //simulate next 
          if (testData[i].Observable.isPlanetObsError !== true)
            subPlanet.next(testData[i].FakeData.oPlanetList);
          else
            subPlanet.error('Not_Valid'); //Simulating of error case
          fnTestExpects(compiledElement, component, testData[i].ObsExpects);
        }

        //Vehicles Obs
        if (testData[i].Observable.bTriggerVehicleObs) {
          //simulate next 
          if (testData[i].Observable.isVehicleObsError !== true)
            subVehicles.next(testData[i].FakeData.oVehicleList);
          else
            subVehicles.error('Not_Valid'); //Simulating of error case
          fnTestExpects(compiledElement, component, testData[i].ObsExpects);
        }

        /*Click button mocking */
        if (testData[i].UIActions.bFindingFalconeButtonClick === true) {
          const btnElement = compiledElement.getElementsByClassName("app-ff-button")[0] as HTMLElement
          btnElement.click();
          fnTestExpects(compiledElement, component, testData[i].ActionExpects);
        }
        done();
      });

      afterAll(() => {
        //expect.DisplaySummary(bCallFromMyself, nGlobalIndex, testData, prefix, uiResultNodes);
      });
    });
  }
}