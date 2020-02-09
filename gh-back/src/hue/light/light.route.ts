import {Router} from 'express';
import {LightController} from './light.controller';
import {checkDtoRequest} from '../../common/middleware/check-dto-request.middleware';
import {ColorDto} from './dto/color.dto';

const router = Router();

const lightController = new LightController();

router
    .route('/hue/light/changeColor')
    .post(checkDtoRequest(new ColorDto()),
        lightController.changeColor.bind(lightController));

export default router;
