import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';

import { SpriteDirective } from './directives/sprite.attr.directive';

@NgModule({
  declarations: [
    AppComponent,
    SpriteDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
