import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url = environment.url + environment.api + environment.v1 + '/location';

  constructor(private httpClient: HttpClient) {
  }

  getLocations(path: string) {
    const url = this.url + path;
    return this.httpClient.get(url);
  }

  postLocation(path: string, body: any) {
    const url = this.url + path;
    return this.httpClient.post(url, body);
  }

  putLocation(path: string, body: any) {
    const url = this.url + path;
    return this.httpClient.put(url, body);
  }

  deleteLocation(path: string) {
    const url = this.url + path;
    return this.httpClient.delete(url);
  }
}
