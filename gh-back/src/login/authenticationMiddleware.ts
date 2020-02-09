import {NextFunction, Request, Response} from 'express';
import {constants} from 'http2';
import {verify, VerifyErrors} from 'jsonwebtoken';
import {getConfiguration} from '../utils/utils';
import {User} from '../user/user';
import {UserService} from '../user/user.service';

export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
    // check header or url parameters or post parameters for token
    // tslint:disable-next-line
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['jwt'];

    // decode token
    if (token) {
        const configuration: any = getConfiguration();
        // verifies secret and checks exp
        verify(token, configuration.authentication.secret, (err: VerifyErrors, decoded: User) => {
            if (err) {
                return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send({
                    message: 'No token provided.',
                    success: false
                });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;
                UserService.getInstance().getById(decoded.id).then((user: User) => {
                    // @ts-ignore
                    req.user = user;
                    next();
                });
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send({
            message: 'No token provided.',
            success: false
        });
    }
}
