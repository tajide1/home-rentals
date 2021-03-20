import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {delay, map} from 'rxjs/operators';
export interface home {
  image_url: string;
  location: string;
  title: string;
  type: string;
}

export interface state {
  loading: boolean;
  data:home[]
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  // Indicates that homes are loading
  homes$ = new BehaviorSubject<state>({loading:true, data:[]})
  loadHomes(homeTypeFilters:any, searchString:string) {
    this.homes$.next({loading:true, data:[]})
     this.httpClient.get<home[]>('./assets/homes.json').pipe(
      delay(2000),
      map(homes => {
        if(!homeTypeFilters.length) {
          return homes
        }
        return homes.filter(home => homeTypeFilters.includes(home.type))
      }),
      map(homes => {
        if(!searchString) {
          return homes
        }
        return homes.filter(home => home.title.toLowerCase().includes(searchString.toLowerCase()))
      })
    ).subscribe(homes => {
      this.homes$.next({loading:false, data:homes});
    });

  }
}
