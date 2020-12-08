import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../service/location.service';
import {Router} from '@angular/router';
import {Location} from '../../shared/model/location';
import {Response} from '../../shared/model/response';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locations: Location[];
  showModal = false;
  idToBeDeleted = -1;

  constructor(private locationService: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.readAllLocations();
  }


  readAllLocations() {
    this.locationService.getLocations('/read').subscribe((response: Response) => {
      if (response.success) {
        this.locations = response.data;
      }
    });
  }

  onCreate() {
    this.router.navigate(['create']);
  }

  openModal(id) {
    this.showModal = !this.showModal;
    this.idToBeDeleted = id;
  }

  onDelete() {
    const path = '/delete/' + this.idToBeDeleted;
    this.locationService.deleteLocation(path).subscribe(response => {
      this.readAllLocations();
      this.showModal = false;
      this.idToBeDeleted = -1;
    });
  }

  onLocationDetails(id: any) {
    this.router.navigate([`location/${id}`]);
  }
}
