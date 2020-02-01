import {User} from './user';
import {getRepository} from 'typeorm';
import {UserEntity} from './entity/user.entity';
import {compareSync} from 'bcrypt';

export class UserService {
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    private static instance: UserService;

    private constructor() {
    }

    // noinspection JSMethodCanBeStatic
    getById(id: string | number): Promise<User> {
        return getRepository(UserEntity).findOne(id);
    }

    // noinspection JSMethodCanBeStatic
    getByUsername(username: string, password: string): Promise<User> {
        return getRepository(UserEntity)
            .createQueryBuilder()
            .select(['id', 'password', 'username', 'role'])
            .where('username = \'' + username + '\'')
            .getRawOne()
            // return getRepository(PlayerEntity).findOne({where: {nickname: username}})
            .then((user: User) => {
                if (!user) {
                    return Promise.reject('USER_NOT_FOUND');
                }
                const playerPassword = user.password;
                delete user.password;
                return compareSync(password, playerPassword) ? user : Promise.reject('USER_NOT_FOUND');
            });
    }
}
