import {Component, Input} from "@angular/core";

@Component({
  selector: 'cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent {
  @Input('title')
  private title: string;

  public submitTicketQuant(quant) {
    console.log(quant);
  }
}
