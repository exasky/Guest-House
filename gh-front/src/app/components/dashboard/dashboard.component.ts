import {Component, HostBinding, OnInit} from '@angular/core';
import {LightService} from "../../services/light.service";
import {LightModel} from "../../model/light/light";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') cssClass = 'd-flex flex-grow';

  lights: LightModel[];

  constructor(public lightService: LightService) {
  }

  ngOnInit(): void {
    this.lightService.getAll().subscribe(lights => {
      this.lights = lights;
    })
  }
}
