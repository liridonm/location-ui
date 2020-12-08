import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor() {
  }

  /**
   *
   * @returns instance of JwtHelperService
   */
  getJwtHelperService(): JwtHelperService {
    return this.jwtHelperService;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    return this.jwtHelperService.isTokenExpired(token);

  }
}
