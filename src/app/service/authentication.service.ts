import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {TokenService} from '../shared/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headerOptions = {
    headers: new HttpHeaders({skip: 'true'})
  };
  url = environment.url;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
  }

  doLogin(path: string, body: any) {
    const url =  this.url + path;

    return this.httpClient.post(url, body, this.headerOptions)
      .pipe(map((response: any) => {
        if (response.success) {
          const token = response.data.jwt;
          this.tokenService.setToken(token);
        }
      }));
  }

  createUser(path: string, body: any) {
    const url = this.url + path;
    return this.httpClient.post(url, body, this.headerOptions);
  }
}
