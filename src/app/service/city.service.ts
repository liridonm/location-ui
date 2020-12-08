import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  url = environment.url + environment.api + environment.v1 + '/city';

  constructor(private httpClient: HttpClient) {
  }

  getCities(path: string) {
    const url = this.url + path;
    return this.httpClient.get(url);
  }
}
