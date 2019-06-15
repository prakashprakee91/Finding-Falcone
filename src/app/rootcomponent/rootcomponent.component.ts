import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { Subscription } from 'rxjs';
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
export class RootcomponentComponent implements OnInit, OnDestroy {

  nSelect = 4;
  public aPlanets = [];
  public aVehicles = [];
  public sDummyArray = [0, 1, 2, 3];

  private oPlanetSubcription: Subscription = null;
  private oVehicleSubcription: Subscription = null;

  constructor(private utService: UtilityService) { }
  /**
   *Fetching data and subscription are handled in this lifecycle
   *
   * @memberof RootcomponentComponent
   */
  public ngOnInit(): void {
    this.fetchData();

    if (!!this.utService.obsPlanet$) {
      this.oPlanetSubcription = this.utService.obsPlanet$.subscribe(oPlanets => {
        this.aPlanets = oPlanets;
      },
        error => { console.log(error) }
      );
    }

    if (!!this.utService.obsVehicles$) {
      this.oVehicleSubcription = this.utService.obsVehicles$.subscribe(vehicles => {
        this.aVehicles = vehicles;
      },
        error => { console.log(error) }
      );
    }
  }

  public ngOnDestroy(): void {
    if (!!this.oPlanetSubcription)
      this.oPlanetSubcription.unsubscribe();
    if (!!this.oVehicleSubcription)
      this.oVehicleSubcription.unsubscribe();
  }
  /**
   *Fetches data from server
   *
   * @memberof RootcomponentComponent
   */
  public fetchData() {
    this.utService.fetchServerData();
  }


  /**
   *Gets data
   *
   * @memberof RootcomponentComponent
   */
  public getPostData(): void {
    console.log(this.add1(10)(20));
    //this.utService.getPostData();
  }

  private add1(a) {
    console.log();
  }


}
