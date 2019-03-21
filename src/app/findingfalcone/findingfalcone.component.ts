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

  ngOnInit() {
    this.setDefaults();
  }
  
  public fnDoSomething(){
    let index = this.oPlanetList.findIndex(
      (item) => item.name === this.sPlanet
    );
    this.indexp = index;
    this.utService.setSelectedPlanet(this.sDummy,index);

  }

  
  public fnVehicles(index): void{
    this.utService.setVehicles(this.sDummy,index);
  }

  public fnDisableInput(vehicles): boolean{
    if(vehicles.total_no === 0)
      return true;
    if(this.indexp === -1)
      return false;
    if(vehicles.max_distance < this.oPlanetList[this.indexp].distance)
      return true;
    return false;
  }

  private setDefaults(): void{

  }
  
}
