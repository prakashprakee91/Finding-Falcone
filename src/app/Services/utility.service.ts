import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
/**
 *This is where the business logic is done
 *
 * @export
 * @class UtilityService
 */
@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  private oPlanetsData;
  private oVehicles;

  private selectedList = [];

  private subPlanets = new BehaviorSubject(this.oPlanetsData);
  public obsPlanet$ = this.subPlanets.asObservable();
  private subVehicles = new BehaviorSubject(this.oVehicles);
  public obsVehicles$ = this.subVehicles.asObservable();
  private token ;
  constructor(private httpClient: HttpClient, private router: Router) { }
/**
 *Data fetching for go on with the app
 *
 * @memberof UtilityService
 */
public fetchServerData(): void {
    const planets = this.httpClient.get('https://findfalcone.herokuapp.com/planets').subscribe(
      result => {
        this.oPlanetsData = result;
        this.oPlanetsData.forEach(element => {
          element.isActive = false;
        });
        this.subPlanets.next(this.oPlanetsData);
        console.log(this.oPlanetsData);
      });
    this.httpClient.get('https://findfalcone.herokuapp.com/vehicles').subscribe(
      result => {
        this.oVehicles = result;
        this.subVehicles.next(this.oVehicles);
        console.log(result);
      });
    const body = {};
    const headerOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    };
    this.httpClient.post('https://findfalcone.herokuapp.com/token', body, headerOptions).subscribe(
      result => {
        this.token = result;

      });
  }
/**
 *This method will fire the call to server to find the result
 *
 * @memberof UtilityService
 */
public getPostData(): void{
    
    const planets = [];
    const vehicles = [];
    for(var i = 0; i<this.selectedList.length; i++){
      planets.push(this.selectedList[i].planet.name);
      vehicles.push(this.selectedList[i].vehicle.name);
    }
        const obj = {
          "token": this.token.token,
          "planet_names": planets,
          "vehicle_names": vehicles
    }
    const headerOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type' :'application/json' }),
    };
    this.httpClient.post('https://findfalcone.herokuapp.com/find',JSON.stringify(obj), headerOptions).subscribe(result=>
  {
    let oResult: any = result;
    this.router.navigate(['./success', {status: oResult.status,planet: oResult.planet_name, time:this.getTimeTaken()}]);
  });
  }
/**
 *Logic to set the planet and remove it from the dropdown
 *
 * @param {*} index
 * @param {*} value
 * @returns
 * @memberof UtilityService
 */
public setSelectedPlanet(index, value){
   if(value === -1)
    return;
   const i = this.getValueAtIndex(index);
   if(i !== -1)
    this.oPlanetsData[i].isActive = false;
    this.oPlanetsData[value].isActive = true;
   
   const obj1 = {
    "index": index,
    "planetValue": value,
    "planet": this.oPlanetsData[value]
  }
   this.selectedList.push(obj1);
   this.subPlanets.next(this.oPlanetsData);
 }
 /**
  *returns the position of planet
  *
  * @private
  * @param {*} index
  * @returns
  * @memberof UtilityService
  */
 private getValueAtIndex(index)
 {
   for(let i =0; i< this.selectedList.length; i++){
     if(this.selectedList[i].index === index)
      return this.selectedList[i].planetValue;
   }
   return -1;
 }

/**
 *returns the position of vehickle
 *
 * @private
 * @param {*} index
 * @returns
 * @memberof UtilityService
 */
private getValueAtIndexForVehicle(index)
 {
   for(let i =0; i< this.selectedList.length; i++){
     if(this.selectedList[i].index === index && this.selectedList[i].vehicleValue !== undefined)
      return this.selectedList[i].vehicleValue;
   }
   return -1;
 }

/**
 *sets vehicle wrt corresponding planet and reduce its count or increment it based on user action
 *
 * @param {*} index
 * @param {*} value
 * @returns
 * @memberof UtilityService
 */
public setVehicles(index, value){
 if(value === -1)
    return;
   const i = this.getValueAtIndexForVehicle(index);
   if(i !== -1)
   this.oVehicles[i].total_no++ ;
   this.oVehicles[value].total_no--;
   this.selectedList.forEach(obj => {
     if(obj.index === index)
      obj.vehicle = this.oVehicles[value];
      obj.vehicleValue = value;
   })
   this.subVehicles.next(this.oVehicles);
  }
/**
 *Calcuates the time taken at a given instance
 *
 * @returns
 * @memberof UtilityService
 */
public getTimeTaken(){
    let time : number = 0;
    for(let i = 0; i < this.selectedList.length; i++)
    {
      if(this.selectedList[i].vehicle === undefined)
        continue;
      time = time + Math.floor(this.selectedList[i].planet.distance/this.selectedList[i].vehicle.speed)
    }
    return time;
  }
}
