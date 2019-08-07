import {Injectable} from "@angular/core";

export type Place = {num: number, isFree: boolean};

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

  public fillPlaces(quant: number): Array<Place> {
    let {places} = this;
    const freePlaces: number = this.getFreePlaces();

    if (quant > freePlaces) {
      console.error(`You have asked for ${quant} places, but there are only ${freePlaces} place|places`);
    } else {
      let boughtPlaces: Array<Place> = [];

      const freeSit: number = this.findFreeSit();
      let k: number = 0;
      for (let i: number = 0; i < places.length; i++) {
        if (i === freeSit) {
          while (quant > k) {
            let place = places[i + k];
            place.isFree = false;
            boughtPlaces.push(place);
            k++;
          }
        }
      }
      return boughtPlaces;
    }
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
