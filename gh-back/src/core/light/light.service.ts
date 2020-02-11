import {getLogger} from '../../utils/utils';
import {getRepository} from 'typeorm';
import {LightEntity} from './entity/light.entity';
import {LightModel} from './light';
import {Constant} from '../../utils/constant';
import {HomeService} from '../central/central.service';

export class LightService implements HomeService {

    static getInstance() {
        if (!LightService._instance) {
            LightService._instance = new LightService();
        }
        return LightService._instance;
    }

    private static _instance: LightService;

    private services: Map<string, ILightService>;

    private constructor() {
        this.services = new Map<string, ILightService>();
    }

    registerService(manufacturer: string, lightService: ILightService) {
        lightService.createOrUpdateAll().then(() => {
            getLogger().info('[LightService] Lights updated for manufacturer: ' + manufacturer);
        });
        this.services.set(manufacturer, lightService);
    }

    getAll(): Promise<LightModel[]> {
        return getRepository(LightEntity).find();
    }

    changeColor(manufacturer: string, lightId: number, red: number, green: number, blue: number, brightness: number): Promise<any> {
        const lightService = this.services.get(manufacturer);
        if (!lightService) {
            getLogger().error('[LightService] could not find light service for manufacturer: ' + manufacturer);
            return Promise.reject(Constant.ERROR.MANUFACTURER.NOT_FOUND);
        }

        return lightService.changeColor(lightId, red, green, blue, brightness);
    }

    async onOff(manufacturer: string, lightId: number, on: boolean): Promise<any> {
        const lightService = this.services.get(manufacturer);
        if (!lightService) {
            getLogger().error('[LightService] could not find light service for manufacturer: ' + manufacturer);
            return Promise.reject(Constant.ERROR.MANUFACTURER.NOT_FOUND);
        }

        return lightService.onOff(lightId, on);
    }

    async createOrUpdateAll(): Promise<LightModel[]> {
        const promises: Promise<LightModel[]>[] = [];
        this.services.forEach(service => {
            promises.push(service.createOrUpdateAll());
        });
        return new Promise((res, rej) => {
            Promise.all(promises).then(allLights => {
                let lightList: LightModel[] = [];
                allLights.forEach(lightsFromPromise => {
                    lightList = lightList.concat(lightsFromPromise);
                });
                res(lightList);
            }).catch(err => {
                rej(err);
            });
        });
    }
}

export interface ILightService {
    changeColor(lightId: number, red: number, green: number, blue: number, brightness: number): Promise<boolean>;
    onOff(lightId: number, on: boolean): Promise<boolean>
    createOrUpdateAll(): Promise<LightModel[]>;
}
