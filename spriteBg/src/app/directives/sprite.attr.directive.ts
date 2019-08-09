import {Directive, HostBinding, HostListener, Attribute, OnInit} from '@angular/core';

@Directive({
  selector: '[sprite]',
  exportAs: 'sprite'
})
export class SpriteDirective implements OnInit {

  @HostBinding('style.background-image')
  private url: string;
  @HostBinding('style.background-position-x.px')
  private offsetX: number;
  @HostBinding('style.background-position-y.px')
  private offsetY: number;
  @HostBinding('style.width.px')
  private width: number;
  @HostBinding('style.height.px')
  private height: number;

  @HostListener('click', ['$event'])
  public onSpriteClick(ev: Event): void {
    console.log(ev);
    this.changeCoords();
  }

  constructor(
    @Attribute('sprite-url') private spriteUrl: string,
    @Attribute('sprite-offset-x') private spriteOffsetX: number,
    @Attribute('sprite-offset-y') private spriteOffsetY: number,
    @Attribute('sprite-width') private spriteWidth: number,
    @Attribute('sprite-height') private spriteHeight: number,
  ) {}

  ngOnInit():void {
    this.url = `url(${this.spriteUrl})`;
    this.offsetX = Number(this.spriteOffsetX);
    this.offsetY = Number(this.spriteOffsetY);
    this.width = Number(this.spriteWidth);
    this.height = Number(this.spriteHeight);
  }

  changeCoords(): void {
    this.offsetY += Number(this.spriteHeight);
  }
}
