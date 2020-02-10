import {LightModel} from '../light';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}
