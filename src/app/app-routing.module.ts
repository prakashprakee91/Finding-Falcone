import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindingfalconeComponent } from 'src/app/findingfalcone/findingfalcone.component';
import { SuccessmessageComponent } from 'src/app/successmessage/successmessage.component';
import { AppComponent } from 'src/app/app.component';
import { RootcomponentComponent } from 'src/app/rootcomponent/rootcomponent.component';

const routes: Routes = [
  {
    path:'findingFalcone', component: RootcomponentComponent
  },
  {
    path: 'success', component: SuccessmessageComponent
  },
  { path: '',
    redirectTo: '/findingFalcone',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
