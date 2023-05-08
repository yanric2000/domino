import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  PoButtonModule,
  PoFieldModule,
  PoModule,
  PoPageModule,
  PoWidgetModule,
} from '@po-ui/ng-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedraComponent } from './src/pedra/pedra.component';

@NgModule({
  declarations: [AppComponent, PedraComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoFieldModule,
    PoButtonModule,
    PoPageModule,
    PoWidgetModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
