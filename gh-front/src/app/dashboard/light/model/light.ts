import {DeviceType, EquipmentModel} from "../../../core/model/equipmentModel";

export class LightModel implements EquipmentModel {
  id?: number;
  light_id: number; // TODO PASSER EN STRING
  name: string;
  manufacturer: string;
  type = DeviceType.LIGHT;
}
