import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../shared/service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  hasToken: boolean;

  constructor(private tokenService: TokenService, private router: Router) {
    this.hasToken = this.tokenService.isTokenExpired();
  }

  ngOnInit(): void {
  }


  doLogout() {
    this.tokenService.deleteToken();
    this.router.navigate(['login']);

  }
}
