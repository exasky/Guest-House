import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {LightDetailModel, LightModel} from "../model/light";
import {LightService} from "../service/light.service";
import {MccColorPickerComponent} from "material-community-components/color-picker/color-picker.component";
import {MatSliderChange} from "@angular/material/slider/slider";

@Component({
  selector: 'app-light-card',
  templateUrl: './light-card.component.html',
  styleUrls: ['./light-card.component.scss']
})
export class LightCardComponent implements OnInit {
  @Input()
  light: LightModel;

  color: string;
  brightness: number = 0;

  constructor(private lightService: LightService) {
  }

  ngOnInit(): void {
    this.updateDetails();
  }

  onOff() {
    const onOff = !(this.light as LightDetailModel).on;
    const lightId = this.light.lightId;
    const man = this.light.manufacturer;
    this.lightService.onOff(onOff, man, lightId).subscribe(value => {
      this.updateDetails();
    });
  }

  changeColor(hexColor: string) {
    this.lightService.changeColor(hexColor, this.brightness, this.light as LightDetailModel).subscribe(res => {
      this.updateDetails();
    })
  }

  changeBrightness(event: MatSliderChange) {
    this.lightService.changeColor(this.color, event.value, this.light as LightDetailModel).subscribe(res => {
      this.updateDetails();
    })
  }

  private updateDetails() {
    this.lightService.getDetail(this.light.id).subscribe(lightDetail => {
      this.light = lightDetail;
      this.brightness = lightDetail.on ? (lightDetail.brightness / 255) * 100 : 0;
      this.color = this.lightService.rgbToHex(lightDetail.red, lightDetail.green, lightDetail.blue);
    })
  }
}
