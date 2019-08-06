import {Injectable} from "@angular/core";

type Place = {num: number, isFree: boolean};

@Injectable()
export class TicketsService {
  private places: Array<Place> = [];
  private capacity: number = 10;

  constructor() {

    for (let i = 1; i <= this.capacity; i++) {
      this.places.push({
        num: i,
        isFree: true
      })
    }

    this.fillRandomPlaces(2);
  }

  public getPlaces(): number {
    return this.places.length;
  }

  public getFreePlaces(): number {
    return this.places.filter((place: Place): any => place.isFree).length;
  }

  public getTakenPlaces(): number {
    return this.places.filter((place: Place): any => !place.isFree).length;
  }

  public fillRandomPlaces(quant: number) {
    const {places} = this;
    console.log(quant, this.findFreeSit());
  }

  public findFreeSit(): number {
    const {places} = this;
    for (let i = 0; i < places.length; i++) {
      if (places[i].isFree) {
        return i;
      }
    }
  }
}
