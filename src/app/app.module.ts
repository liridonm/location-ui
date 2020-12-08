import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationComponent } from './component/location/location.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationDetailsComponent } from './component/location/location-details/location-details.component';
import { CreateLocationComponent } from './component/location/create-location/create-location.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { UserCreateComponent } from './component/user-create/user-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './shared/interceptor/jwt.interceptor';
import { MenuComponent } from './component/menu/menu.component';
import { RouterModule } from '@angular/router';
import { EditLocationComponent } from './component/location/edit-location/edit-location.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    LocationDetailsComponent,
    CreateLocationComponent,
    LoginComponent,
    UserCreateComponent,
    MenuComponent,
    EditLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [   {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
