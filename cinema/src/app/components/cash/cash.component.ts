import {Component, Input} from "@angular/core";
import {TicketsService} from "../../services/tickets.service";

@Component({
  selector: 'cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent {
  @Input('title')
  private title: string;

  constructor(private tickets: TicketsService) {

  }

  public submitTicketQuant(quant): void {
    this.tickets.fillPlaces(quant);
  }
}
