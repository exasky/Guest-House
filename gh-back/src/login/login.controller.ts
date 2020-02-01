import {Request, Response} from 'express';
import {constants} from 'http2';
import {LoginService} from './login.service';

export class LoginController {
    private loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    login(req: Request, res: Response) {
        const credentials = req.body;
        this.loginService.login(credentials)
            .then((token: string) => {
                res.send({token});
            }).catch((err: any) => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        });
    }
}
