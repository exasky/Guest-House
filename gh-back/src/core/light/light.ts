import {DeviceType, EquipmentModel} from '../central/equipment';

export interface LightModel extends EquipmentModel {
    id?: number;
    lightId: number;
    name: string;
    manufacturer: string;
    type: DeviceType.LIGHT;
}

export interface LightDetailModel {
    on: boolean;
    red: number;
    green: number;
    blue: number;
    brightness: string;
}
