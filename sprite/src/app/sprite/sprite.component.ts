import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Coords} from '../app/app.component';

@Component({
  selector: 'sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})

export class SpriteComponent {
  @Input('url')
  private _url:string;

  @Input('coords')
  private _coords:Coords;

  @Output('coordsChange')
  private coordsChange:EventEmitter<Coords> = new EventEmitter<Coords>();

  handleClick() {
    this.coordsChange.emit(Object.assign(this._coords, {
      x: this._coords.x + 20,
      y: this._coords.y + 20,
    }))
  }
}
