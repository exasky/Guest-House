import {LightModel} from '../light';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {DeviceType} from '../../central/equipment';

@Entity({name: 'light'})
export class LightEntity implements LightModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'light_id', unique: true})
    lightId: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    manufacturer: string;

    /*
     * Assign type here instead of 'type: DeviceType.LIGHT;' to set the value (use full to return entity to front)
     */
    type = DeviceType.LIGHT;
}
