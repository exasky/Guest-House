import {Router} from 'express';
import {LoginController} from './login.controller';
import {LoginService} from './login.service';

const router = Router();

const loginController = new LoginController(LoginService.getInstance());

router
    .route('/login')
    .post(loginController.login.bind(loginController));

export default router;
