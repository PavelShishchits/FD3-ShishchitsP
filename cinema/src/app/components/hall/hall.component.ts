import {Component} from "@angular/core";
import {TicketsService} from "../../services/tickets.service";

@Component({
  selector: 'hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent {
  private places: number;
  private placesFree: number;
  private placesTaken: number;

  constructor(private tickets: TicketsService) {
    this.places = this.tickets.getPlaces();
    this.placesFree = this.tickets.getFreePlaces();
    this.placesTaken = this.tickets.getTakenPlaces();
  }
}
