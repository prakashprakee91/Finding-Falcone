import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-planetvehicles',
  templateUrl: './planetvehicles.component.html',
  styleUrls: ['./planetvehicles.component.scss']
})
export class PlanetvehiclesComponent implements OnInit {

  @Input() public oVehicleList;
  @Input() public oSelectedPlanet;
  @Input() public sDummy;
  constructor(private utService: UtilityService) { }

  ngOnInit() {
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
    if(this.oSelectedPlanet === undefined)
      return false;
    if(vehicles.max_distance < this.oSelectedPlanet.distance)
      return true;
    return false;
  }

}
