import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LocationComponent} from './component/location/location.component';
import {LoginComponent} from './component/login/login.component';
import {UserCreateComponent} from './component/user-create/user-create.component';
import {CreateLocationComponent} from './component/location/create-location/create-location.component';
import {LocationDetailsComponent} from './component/location/location-details/location-details.component';
import {EditLocationComponent} from './component/location/edit-location/edit-location.component';
import {AuthGuard} from './shared/guard/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'locations', pathMatch: 'full'},
  {path: 'locations', canActivate: [AuthGuard], component: LocationComponent},
  {path: 'location/:id', canActivate: [AuthGuard], component: LocationDetailsComponent},
  {path: 'create', canActivate: [AuthGuard], component: CreateLocationComponent},
  {path: 'edit/:id', canActivate: [AuthGuard], component: EditLocationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserCreateComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
