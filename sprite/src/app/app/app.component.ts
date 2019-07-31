import { Component } from '@angular/core';

export type Coords = {x:number, y:number, width:number, height:number};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _url:string;
  private _coords:Coords;

  constructor() {
    this._url = 'http://fe.it-academy.by/Examples/cards2.png';
    this._coords = {
      x: 0,
      y: 0,
      width: 140,
      height: 200
    };
  }

  get url():string {
    return this._url;
  }

  set url(url:string) {
    this._url = url;
  }

  get coords():Coords {
    return this._coords;
  }

  set coords(newCoords:Coords) {
    this._coords = newCoords;
  }
}
