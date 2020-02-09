import {LightModel} from '../light';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'light'})
export class LightEntity implements LightModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    light_id: number;

    @Column({unique: true})
    name: string;
}
