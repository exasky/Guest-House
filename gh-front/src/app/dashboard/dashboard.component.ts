import {Component, ComponentFactoryResolver, HostBinding, OnInit, ViewContainerRef} from '@angular/core';
import {LightService} from "./light/service/light.service";
import {CentralService} from "../core/home-services/central.service";
import {DeviceType, EquipmentModel} from "../core/model/equipmentModel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') cssClass = 'd-flex flex-grow flex-column';

  equipments: EquipmentModel[];
  types: DeviceType[];
  DeviceType = DeviceType;

  constructor(public lightService: LightService,
              public centralService: CentralService,
              private factoryResolver: ComponentFactoryResolver,
              private rootViewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.centralService.getAll().subscribe(equipments => {
      this.equipments = equipments;
    });
    this.centralService.getEquipmentTypes().subscribe(types => {
      this.types = types;
    });
  }

  private injectEquipmentComponents() {
    this.equipments.forEach(equipment => {
      let equipmentComponent;
      switch (equipment.type) {
        case DeviceType.LIGHT:
          // equipmentComponent = Lig
        default:
          break;
      }

      const factory = this.factoryResolver
        .resolveComponentFactory(equipmentComponent)
      const component = factory
        .create(this.rootViewContainer.parentInjector)
      this.rootViewContainer.insert(component.hostView)
    })
  }
}
