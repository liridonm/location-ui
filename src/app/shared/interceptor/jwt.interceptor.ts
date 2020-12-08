import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../service/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenService = this.tokenService;
    const skip = request.headers.get('skip') || false;

    if (!tokenService.isTokenExpired() && !skip) {
      request = request.clone({
        setHeaders: {
          Authorization: tokenService.getToken()
        }
      });
    }
    return next.handle(request);
  }
}
