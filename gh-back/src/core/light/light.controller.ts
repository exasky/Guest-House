import {Request, Response} from 'express';
import {constants} from 'http2';
import {LightService} from './light.service';
import {ColorDto} from './dto/color.dto';
import {OnOffDto} from './dto/on-off.dto';
import {getLogger} from '../../utils/utils';

export class LightController {
    private lightService: LightService;

    constructor() {
        this.lightService = LightService.getInstance();
    }

    getAll(req: Request, res: Response) {
        this.lightService.getAll()
            .then(lights => {
                res.send(lights);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }

    getDetail(req: Request, res: Response) {
        const id = req.params.id;
        this.lightService.getDetail(id)
            .then(light => {
                res.send(light);
            })
            .catch((err: any) => {
                getLogger().error(err);
                res.status(400).send(err);
            });
    }

    on(req: Request, res: Response) {
        const c: OnOffDto = req.body;

        this.lightService.onOff(c.manufacturer, c.id, true)
            .then(result => {
                res.send(result);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }

    off(req: Request, res: Response) {
        const c: OnOffDto = req.body;

        this.lightService.onOff(c.manufacturer, c.id, false)
            .then(result => {
                res.send(result);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }

    changeColor(req: Request, res: Response) {
        const c: ColorDto = req.body;

        this.lightService.changeColor(c.manufacturer, c.lightId, c.red, c.green, c.blue, c.brightness)
            .then(result => {
                res.send(result);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }
}
