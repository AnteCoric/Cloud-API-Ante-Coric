import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatSidenavModule, MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    [MatGridListModule, MatCardModule, MatSidenavModule, MatExpansionModule]

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  showFiller = false;
}
