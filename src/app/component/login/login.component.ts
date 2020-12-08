import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {TokenService} from '../../shared/service/token.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthenticationService, private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const path = '/authenticate';
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    this.subscription = this.authService.doLogin(path, formValue).subscribe(response => {
      if (this.tokenService.getToken()) {
        this.router.navigate(['locations']);
      }
    });
  }

}
