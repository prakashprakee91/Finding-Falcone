import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';

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
  
  public ngOnInit(): void{
    this.fetchData();
    this.utService.obsPlanet$.subscribe( oPlanets =>{
      // oPlanets.forEach(element => {
      //   element.isActive = 'false';
      // });
      this.aPlanets = oPlanets;
    });

    this.utService.obsVehicles$.subscribe( vehicles =>{
      this.aVehicles = vehicles//JSON.parse(JSON.stringify(vehicles));
    });
  }
  
  public fetchData(){
    this.utService.fetchServerData();
  }

  public fnGetTimeTaken(){
   return this.utService.getTimeTaken();
  }
  public getPostData(): void{
    this.utService.getPostData();
  }
     

}
