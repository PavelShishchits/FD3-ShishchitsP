import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { HallComponent } from './components/hall/hall.component';
import { CashComponent } from './components/cash/cash.component';

import { TicketsService } from './services/tickets.service';

@NgModule({
  declarations: [
    AppComponent,
    HallComponent,
    CashComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
