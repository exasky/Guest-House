import {Request, Response} from 'express';
import {constants} from 'http2';
import {CentralService} from './central.service';

export class CentralController {
    private centralService: CentralService;

    constructor() {
        this.centralService = CentralService.getInstance();
    }

    getAll(req: Request, res: Response) {
        this.centralService.getAll()
            .then(homeServices => {
                res.send(homeServices);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }

    getEquipmentTypes(req: Request, res: Response) {
        this.centralService.getEquipmentTypes()
            .then(deviceTypes => {
                res.send(deviceTypes);
            }).catch(err => {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).send(err);
        })
    }
}
