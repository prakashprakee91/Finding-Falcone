import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../Services/utility.service';

@Component({
  selector: 'app-time-component',
  templateUrl: './time-component.component.html',
  styleUrls: ['./time-component.component.scss']
})
export class TimeComponentComponent implements OnInit {

  constructor(private utService: UtilityService) { }

  ngOnInit() {
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

}
