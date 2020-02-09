import {Router} from 'express';
import {LightController} from './light.controller';
import {checkDtoRequest} from '../../common/middleware/check-dto-request.middleware';
import {ColorDto} from './dto/color.dto';

const router = Router();

const lightController = new LightController();

router
    .route('/hue/light/all')
    .get(lightController.getAll.bind(lightController));

router
    .route('/hue/light/changeColor')
    .post(checkDtoRequest(new ColorDto()),
        lightController.changeColor.bind(lightController));

router
    .route('/hue/light/on')
    .post(lightController.on.bind(lightController));

router
    .route('/hue/light/off')
    .post(lightController.off.bind(lightController));

export default router;
