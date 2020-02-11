import {Router} from 'express';
import {LightController} from './light.controller';
import {checkDtoRequest} from '../../common/middleware/check-dto-request.middleware';
import {ColorDto} from './dto/color.dto';
import {checkAuthentication} from '../../login/authenticationMiddleware';

const router = Router();

const lightController = new LightController();

router
    .route('/light/all')
    .get(checkAuthentication,
        lightController.getAll.bind(lightController));

router
    .route('/light/change-color')
    .post(checkAuthentication,
        checkDtoRequest(new ColorDto()),
        lightController.changeColor.bind(lightController));

router
    .route('/light/on')
    .post(checkAuthentication,
        lightController.on.bind(lightController));

router
    .route('/light/off')
    .post(checkAuthentication,
        lightController.off.bind(lightController));

export default router;
