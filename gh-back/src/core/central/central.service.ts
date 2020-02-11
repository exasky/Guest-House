import {HomeServiceModel} from './home-service';
import {getLogger} from '../../utils/utils';
import {ILightService} from '../light/light.service';

export class CentralService {
    static getInstance() {
        if (!CentralService._instance) {
            CentralService._instance = new CentralService();
        }
        return CentralService._instance;
    }

    private static _instance: CentralService;

    private services: HomeService[];
    
    private constructor() {
        this.services = [];
    }

    registerService(homeService: HomeService) {
        getLogger().info('[CentralService] ' + homeService.constructor.name + ' registered');
        this.services.push(homeService);
    }

    getAll(): Promise<HomeServiceModel[]> {
        const promises: Promise<HomeServiceModel[]>[] = [];
        this.services.forEach(service => {
            promises.push(service.getAll());
        });
        return new Promise((res, rej) => {
            Promise.all(promises).then(allLights => {
                let homeServiceModels: HomeServiceModel[] = [];
                allLights.forEach(homeServicesFromPromise => {
                    homeServiceModels = homeServiceModels.concat(homeServicesFromPromise);
                });
                res(homeServiceModels);
            }).catch(err => {
                rej(err);
            });
        });
    }

}

/**
 * Implements this interface to create a new type of service (as Light, Roller shutter, etc...)
 */
export interface HomeService {
    getAll(): Promise<HomeServiceModel[]>;
}
