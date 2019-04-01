/*This is the root component */
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router){}

  /**
   *On initialisation of this component, it navigates to finding falcone component
   *
   * @memberof AppComponent
   */
  ngOnInit(){
    this.router.navigate(['./findingFalcone']);
  }

}

