import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
/**
 *This class holds the logic and methods for this component
 *
 * @export
 * @class RootcomponentComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-rootcomponent',
  templateUrl: './rootcomponent.component.html',
  styleUrls: ['./rootcomponent.component.scss']
})
export class RootcomponentComponent implements OnInit {

  nSelect = 4;
  public aPlanets: any;
  public aVehicles: any;
  public sDummyArray = [0,1,2,3];

  constructor(private utService: UtilityService){}
  /**
   *Fetching data and subscription are handled in this lifecycle
   *
   * @memberof RootcomponentComponent
   */
  public ngOnInit(): void{
    this.fetchData();
    this.utService.obsPlanet$.subscribe( oPlanets =>{
      this.aPlanets = oPlanets;
    });

    this.utService.obsVehicles$.subscribe( vehicles =>{
      this.aVehicles = vehicles;
    });
  }
  /**
   *Fetches data from server
   *
   * @memberof RootcomponentComponent
   */
  public fetchData(){
    this.utService.fetchServerData();
  }
/**
 *Gets total time taken
 *
 * @returns
 * @memberof RootcomponentComponent
 */
public fnGetTimeTaken(){
   return this.utService.getTimeTaken();
  }

  /**
   *Gets data
   *
   * @memberof RootcomponentComponent
   */
  public getPostData(): void{
    this.utService.getPostData();
  }
     

}
