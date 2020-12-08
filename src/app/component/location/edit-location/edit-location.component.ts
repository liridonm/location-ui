import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../../service/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CityService} from '../../../service/city.service';
import {City} from '../../../shared/model/city';
import {Location} from '../../../shared/model/location';
import {Response} from '../../../shared/model/response';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {

  form: FormGroup;
  cities: City[];
  location: Location;
  currentId: number;

  constructor(private locationService: LocationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cityService: CityService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.currentId = +param.id;
    });
    this.readCities();
    this.readLocation(this.currentId);
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.location && this.location.name ? this.location.name : '', Validators.required),
      address: new FormControl(this.location && this.location.address ? this.location.address : '', Validators.required),
      longitude: new FormControl(this.location && this.location.longitude ? this.location.longitude : ''),
      latitude: new FormControl(this.location && this.location.latitude ? this.location.latitude : ''),
      city: new FormControl(this.location && this.location.city ? this.location.city.id : '')
    });
  }

  readLocation(id: number) {
    this.locationService.getLocations(`/read/${id}`).subscribe((response: Response) => {
      if (response.success) {
        this.location = response.data;
        this.initForm();
      }
    });
  }

  readCities() {
    this.cityService.getCities('/read').subscribe((response: Response) => {
      if (response.success) {
        this.cities = response.data;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.form.value.city = {id: this.form.value.city};
    const body = this.form.value as Location;

    body.id = this.location.id;
    console.log(body);
    this.locationService.putLocation(`/update`, body).subscribe((response: Response) => {
      if (response.success) {
        this.router.navigate(['locations']);
      }
    });
  }

}
