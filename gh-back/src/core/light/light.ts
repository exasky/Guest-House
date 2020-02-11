import {DeviceType, EquipmentModel} from '../central/equipment';

export interface LightModel extends EquipmentModel {
    id?: number;
    lightId: number;
    name: string;
    manufacturer: string;
    type: DeviceType.LIGHT;
}
