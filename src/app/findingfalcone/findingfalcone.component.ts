import { Component, OnInit, Input, Output } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';


@Component({
  selector: 'app-findingfalcone',
  templateUrl: './findingfalcone.component.html',
  styleUrls: ['./findingfalcone.component.scss']
})
export class FindingfalconeComponent implements OnInit {

  @Input() public oPlanetList;
  @Input() public oVehicleList;
  @Input() public sDummy;
  public sPlanet;
  public oSelectedPlanet;
  private indexp;
  
  constructor(private utService: UtilityService) { }
/**
 *Validates input and sets defaults
 *
 * @memberof FindingfalconeComponent
 */
public ngOnInit(): void {
    this.setDefaults();
  }
  /**
   *Finds the index of the planet in the list and stores it in service utility
   *
   * @memberof FindingfalconeComponent
   */
  public fnSetSelectedPlanet(): void{
    let index = this.oPlanetList.findIndex(
      (item) => item.name === this.sPlanet
    );
    this.indexp = index;
    this.utService.setSelectedPlanet(this.sDummy,index);
    this.oSelectedPlanet = this.oPlanetList[this.indexp];
  }


/**
 *sets defaults
 *
 * @private
 * @memberof FindingfalconeComponent
 */
private setDefaults(): void{
    this.sPlanet = ''
    this.oSelectedPlanet = null;
    this.indexp = -1;
  }
  
}
