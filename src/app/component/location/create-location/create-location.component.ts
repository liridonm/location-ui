import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../../../service/city.service';
import {LocationService} from '../../../service/location.service';
import {Router} from '@angular/router';
import {City} from '../../../shared/model/city';
import {Location} from '../../../shared/model/location';
import {Response} from '../../../shared/model/response';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  form: FormGroup;
  cities: City[];

  constructor(private cityService: CityService, private locationService: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.readAllCities();
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      address: new FormControl(null, [
        Validators.required
      ]),
      longitude: new FormControl(),
      latitude: new FormControl(),
      city: new FormControl()
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }


    this.form.value.city = {id: +this.form.value.city};
    const location = this.form.value as Location;


    this.locationService.postLocation('/create', location).subscribe((response: Response) => {
      if (response.success) {
        this.router.navigate(['locations']);
      }
    });

  }

  readAllCities() {
    this.cityService.getCities('/read').subscribe((response: Response) => {
      if (response.success) {
        this.cities = response.data;
      }
    });
  }
}
