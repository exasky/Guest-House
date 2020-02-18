import {DeviceType, EquipmentModel} from "../../../core/model/equipmentModel";

export class LightModel implements EquipmentModel {
  id?: number;
  lightId: number; // TODO PASSER EN STRING
  name: string;
  manufacturer: string;
  type = DeviceType.LIGHT;
}

export class LightDetailModel extends LightModel {
  on: boolean;
  red: number;
  green: number;
  blue: number;
  brightness: number;
}
