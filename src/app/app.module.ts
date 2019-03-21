import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindingfalconeComponent } from './findingfalcone/findingfalcone.component';
import { SuccessmessageComponent } from './successmessage/successmessage.component';
import { RootcomponentComponent } from './rootcomponent/rootcomponent.component';
import { ContentHolderComponent } from './content-holder/content-holder.component';

@NgModule({
  declarations: [
    AppComponent,
    FindingfalconeComponent,
    SuccessmessageComponent,
    RootcomponentComponent,
    ContentHolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
