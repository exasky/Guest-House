import {Request, Response} from 'express';
import {constants} from 'http2';
import {HueService} from '../hue.service';
import {LightService} from './light.service';
import {ColorDto} from './dto/color.dto';

export class LightController {
    private lightService: LightService;

    constructor() {
        this.lightService = HueService.getInstance().lights;
    }

    changeColor(req: Request, res: Response) {
        const c: ColorDto = req.body;

        this.lightService.changeColor(c.lightId, c.red, c.green, c.blue, c.brightness)
            .then(result => {
                res.send(result);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }
}
