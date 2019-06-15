import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/**
 *This component is loaded only on click of done and message is shown based on result from backend
 *
 * @export
 * @class SuccessmessageComponent
 * @implements {OnInit}
 */
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
/**
 *Gets the message from routing parameter mapping
 *
 * @memberof SuccessmessageComponent
 */
public ngOnInit(): void {
    if(this.router.snapshot.paramMap.get('status') === 'success')
    {
      this.sText = 'Sucess!!! You have found falcone. The King will be pleased with you';
      this.splanetName = this.router.snapshot.paramMap.get('planet');
    }

    else
    {
      this.sText = 'Oops!!! You failed to find falcone. Better luck';
    }
    this.nTime = this.router.snapshot.paramMap.get('time');
  }

}
