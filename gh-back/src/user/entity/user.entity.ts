import {Role, User} from '../user';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'user'})
export class UserEntity implements User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({enum: Role, default: Role.USER})
    role: Role;

    @Column({unique: true})
    username: string;

    @Column({select: false})
    password: string;
}
