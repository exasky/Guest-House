export interface EquipmentModel {
  id?: number;
  name: string;
  manufacturer: string;
  type: DeviceType;
}

export enum DeviceType {
  LIGHT
}
