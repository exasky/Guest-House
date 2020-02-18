import {LightDetailModel, LightModel} from '../light';
import {DeviceType} from '../../central/equipment';

export class LightDto implements LightModel, LightDetailModel {
    id?: number;
    lightId: number;
    name: string;
    manufacturer: string;
    type: DeviceType.LIGHT;
    on: boolean;
    red: number;
    green: number;
    blue: number;
    brightness: string;
}
