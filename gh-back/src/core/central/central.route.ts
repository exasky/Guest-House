import {Router} from 'express';
import {CentralController} from './central.controller';
import {checkAuthentication} from '../../login/authenticationMiddleware';

const router = Router();

const centralController = new CentralController();

router
    .route('/home-services/all')
    .get(checkAuthentication,
        centralController.getAll.bind(centralController));

export default router;
