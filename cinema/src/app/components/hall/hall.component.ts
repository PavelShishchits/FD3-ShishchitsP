import {Component, OnInit} from "@angular/core";
import {TicketsService} from "../../services/tickets.service";
import Place from '../../models/place.model';

@Component({
  selector: 'hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent {
  private places: Place[] = [];

  constructor(private tickets: TicketsService) {

  }

  ngOnInit(): void {
    this.tickets.getSubject().subscribe({
      next: (value) => {
        this.places = value;
      }
    })
  }
}
