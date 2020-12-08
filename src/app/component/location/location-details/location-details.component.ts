import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../service/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Response} from '../../../shared/model/response';
import {Location} from '../../../shared/model/location';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {

  currentId: number;
  location: Location;

  constructor(private locationService: LocationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.currentId = +param.id;
    });
    this.readById(this.currentId);
  }

  readById(id: number) {
    this.locationService.getLocations(`/read/${id}`).subscribe((response: Response) => {
      if (response.success) {
        this.location = response.data;
      }
    });
  }


  onUpdate() {
    this.router.navigate([`edit/${this.currentId}`]);
  }
}
