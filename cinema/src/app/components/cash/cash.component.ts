import {Component, Input} from "@angular/core";
import {TicketsService, Place} from "../../services/tickets.service";

@Component({
  selector: 'cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent {
  @Input('title')
  private title: string;
  private ticketsArray: Array<Place> = [];

  constructor(private tickets: TicketsService) {}

  public submitTicketQuant(quant): void {
    this.ticketsArray = this.tickets.fillPlaces(quant);
    this.renderTickets();
  }

  private renderTickets() {
    return this.ticketsArray.map((ticket: Place): string => {
      return `Ticket number ${ticket.num}`
    }).join(', ');
  }
}
