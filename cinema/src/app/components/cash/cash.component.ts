import {Component, Input} from "@angular/core";
import {TicketsService} from "../../services/tickets.service";
import Place from '../../models/place.model';

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

  private renderTickets(): string {
    return this.ticketsArray.map((ticket: Place): string => {
      return `Ticket number ${ticket.num}`
    }).join(', ');
  }
}
