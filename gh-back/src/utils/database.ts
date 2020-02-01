import {hashSync} from 'bcrypt';
import {getRepository} from 'typeorm';
import {getConfiguration, getLogger} from './utils';
import {UserEntity} from '../user/entity/user.entity';
import {Role} from '../user/user';

export function createAdminUser() {
    const adminFirstPassword = getConfiguration().guestHouse.adminFirstPassword;
    if (adminFirstPassword === 'admin') {
        getLogger().log('warn', '*************************************');
        getLogger().log('warn', '* Admin password is default in conf *');
        getLogger().log('warn', '*************************************');
    }

    const repository = getRepository(UserEntity);
    repository.findOne({
        username: 'admin'
    }).then((user) => {
        if (!user) {
            const userEntity = new UserEntity();
            userEntity.username = 'admin';
            userEntity.password = hashSync(adminFirstPassword, 10);
            userEntity.role = Role.ADMIN;
            repository.save(userEntity).then((user) => {
                getLogger().debug('Admin player created: ' + JSON.stringify(user));
            });
        } else {
            getLogger().debug('Admin already created');
        }
    });
}
