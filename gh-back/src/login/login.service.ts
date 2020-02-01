import {sign} from 'jsonwebtoken';
import {getConfiguration} from '../utils/utils';
import {UserService} from '../user/user.service';
import {User} from '../user/user';

export class LoginService {

    static getInstance() {
        if (!LoginService._instance) {
            LoginService._instance = new LoginService();
        }
        return LoginService._instance;
    }

    private static _instance: LoginService;

    private constructor() {
    }

    login(credential: { username: string, password?: string }): Promise<string> {
        if (!credential) {
            return Promise.reject('CREDENTIAL_NOT_PROVIDED');
        } else if (!credential.username) {
            return Promise.reject('USERNAME_NOT_PROVIDED');
        }

        return UserService
            .getInstance()
            .getByUsername(credential.username, credential.password).then((user) => {
                if (!user) {
                    return Promise.reject('USERNAME_PASSWORD_NOT_FOUND');
                }

                return this.sign(user);
            });
    }

    // noinspection JSMethodCanBeStatic
    sign(player: User) {
        const configuration = getConfiguration();
        return sign(JSON.stringify({
            id: player.id,
            username: player.username,
            role: player.role
        }), configuration.authentication.secret);
    }
}
