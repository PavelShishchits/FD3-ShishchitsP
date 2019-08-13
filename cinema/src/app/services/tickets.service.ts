import {Injectable} from "@angular/core";
import {BehaviorSubject } from 'rxjs';
import Place from '../models/place.model';

@Injectable()
export class TicketsService {
  private places: Place[] = [];
  private capacity: number = 20;
  private places$:BehaviorSubject<Place[]> ;

  constructor() {
    this.fillData();
    this.places$ = new BehaviorSubject<Place[]>(this.places);
  }

  private fillData() {
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

  public fillPlaces(quant: number): Place[] {
    let {places} = this;
    let boughtPlaces: Array<Place> = [];

    const freePlaces: number = this.getFreePlaces();
    if (quant > freePlaces) {
      console.error(`You have asked for ${quant} places, but there are only ${freePlaces} place|places`);
    } else {

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
      this.places$.next(places);
    }
    return boughtPlaces;
  }

  public getSubject(): BehaviorSubject<Place[]> {
    return this.places$;
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
