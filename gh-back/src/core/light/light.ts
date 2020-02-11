import {HomeServiceModel} from '../central/home-service';

export interface LightModel extends HomeServiceModel {
    id?: number;
    lightId: number;
    name: string;
    manufacturer: string;
}
