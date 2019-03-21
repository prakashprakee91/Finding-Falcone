import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-successmessage',
  templateUrl: './successmessage.component.html',
  styleUrls: ['./successmessage.component.scss']
})
export class SuccessmessageComponent implements OnInit {

  public sText: string = '';
  public nTime: string = '';
  public splanetName: string = '';
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    if(this.router.snapshot.paramMap.get('status') === 'success')
    {
      this.sText = 'Sucess!!! You have found falcone. The King will be pleased with you';
      this.splanetName = this.router.snapshot.paramMap.get('planet');
    }

    else
    {
      this.sText = 'Oops!!! You failed to find falcone. Better luck';
    }
    //this.sText = this.router.snapshot.paramMap.get('status');
    this.nTime = this.router.snapshot.paramMap.get('time');
    console.log(this.router.snapshot.paramMap.get('status'));
  }

}
