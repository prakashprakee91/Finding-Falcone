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
  public sPlanet: any = '';
  private indexp = -1;
  
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

  }

  /**
   *Sets selected vehicles
   *
   * @param {*} index
   * @memberof FindingfalconeComponent
   */
  public fnVehicles(index): void{
    this.utService.setVehicles(this.sDummy,index);
  }

  /**
   *Disables the space vehicle which are not applicable for selected planet
   *
   * @param {*} vehicles
   * @returns {boolean}
   * @memberof FindingfalconeComponent
   */
  public fnDisableInput(vehicles): boolean{
    if(vehicles.total_no === 0)
      return true;
    if(this.indexp === -1)
      return false;
    if(vehicles.max_distance < this.oPlanetList[this.indexp].distance)
      return true;
    return false;
  }
/**
 *sets defaults
 *
 * @private
 * @memberof FindingfalconeComponent
 */
private setDefaults(): void{

  }
  
}
