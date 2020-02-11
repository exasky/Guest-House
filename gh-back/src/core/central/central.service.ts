import {EquipmentModel} from './equipment';
import {getLogger} from '../../utils/utils';

/**
 * This aggregate other equipment services (such as {@link LightService}}
 * 
 * Equipment services must implements {@link HomeService} interface.
 *
 * In order to register your own equipment service, use {@link registerService} method.
 */
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

    getAll(): Promise<EquipmentModel[]> {
        const promises: Promise<EquipmentModel[]>[] = [];
        this.services.forEach(service => {
            promises.push(service.getAll());
        });
        return new Promise((res, rej) => {
            Promise.all(promises).then(allLights => {
                let homeServiceModels: EquipmentModel[] = [];
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
    getAll(): Promise<EquipmentModel[]>;
}
