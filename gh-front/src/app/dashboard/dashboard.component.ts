import {Component, HostBinding, OnInit} from '@angular/core';
import {LightService} from "./light/service/light.service";
import {CentralService} from "../core/home-services/central.service";
import {DeviceType, EquipmentModel} from "../core/model/equipmentModel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') cssClass = 'd-flex flex-grow';

  equipments: EquipmentModel[];
  types: DeviceType[];

  constructor(public lightService: LightService,
              public centralService: CentralService) {
  }

  ngOnInit(): void {
    this.centralService.getAll().subscribe(equipments => {
      this.equipments = equipments;
    });
    this.centralService.getEquipmentTypes().subscribe(types => {
      this.types = types;
    });
  }
}
