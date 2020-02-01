import {NextFunction, Request, Response} from 'express';
import {constants} from 'http2';
import {Role, User} from '../user/user';

export function checkAuthorization(roles: Array<(Role | 'SELF')>) {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const currentUser: User = req.user;

        if (roles.indexOf(currentUser.role) !== -1) {
            next();
            return;
        }

        if (roles.indexOf('SELF') !== -1 && +req.params.id === +currentUser.id) {
            next();
            return;
        }

        return res.status(constants.HTTP_STATUS_FORBIDDEN).send({
            message: 'No token provided.',
            success: false
        });
    };
}
