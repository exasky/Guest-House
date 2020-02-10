import {getLogger} from '../../utils/utils';
import Lights from 'node-hue-api/lib/api/Lights';
import Light from 'node-hue-api/lib/model/Light';
import {HueCommonService} from '../hue.common.service';
import {getRepository} from 'typeorm';
import LightState from 'node-hue-api/lib/model/lightstate/LightState';
import {ILightService} from '../../light/light.service';
import {LightModel} from '../../light/light';
import {LightEntity} from '../../light/entity/light.entity';

export class HueLightService extends HueCommonService<Lights> implements ILightService {

    constructor() {
        super();
    }

    getApi(): Promise<Lights> {
        return this.getRootApi().then(api => {
            return api.lights;
        });
    }

    changeColor(lightId: number, red: number, green: number, blue: number, brightness: number): Promise<any> {
        const lightState = new LightState()
            .on(true)
            .rgb(red, green, blue)
            .brightness(brightness);

        return this.getApi().then(api => {
            return api.setLightState(lightId, lightState);
        });
    }

    onOff(lightId: number, on: boolean): Promise<any> {
        const lightState = new LightState().on(on);
        return this.getApi().then(api => {
            return api.setLightState(lightId, lightState);
        });
    }

    async createOrUpdateAll(): Promise<LightModel[]> {
        const api = await this.getApi();
        const all: Light[] = await api.getAll();
        const repository = getRepository(LightEntity);

        return await Promise.all(all.map(light => {
            return repository
                .createQueryBuilder()
                .select()
                .addSelect(['id'])
                .where('light_id = ' + light.id)
                .getOne().then(existingLight => {
                    const toUpdateLight: LightEntity = existingLight ? existingLight : repository.create();

                    toUpdateLight.name = light.name;
                    toUpdateLight.lightId = light.id;
                    toUpdateLight.manufacturer = light.manufacturername;

                    getLogger().debug('[HUE] LightService - '
                        + (existingLight ? 'Updating ' : 'Creating ')
                        + JSON.stringify(toUpdateLight));

                    return repository.save(toUpdateLight);
                });
        }));
    }
}
