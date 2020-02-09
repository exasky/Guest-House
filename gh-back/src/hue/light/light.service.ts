import {getLogger} from '../../utils/utils';
import Lights from 'node-hue-api/lib/api/Lights';
import Light from 'node-hue-api/lib/model/Light';
import {HueCommonService} from '../common/hue.common.service';
import {getRepository} from 'typeorm';
import {LightEntity} from './entity/light.entity';
import {LightModel} from './light';
import LightState from 'node-hue-api/lib/model/lightstate/LightState';

export class LightService extends HueCommonService<Lights> {

    constructor() {
        super();
        this.createOrUpdateAll().then(() => {
            getLogger().info('[HUE] LightService - All updated');
        })
    }

    async getApi(): Promise<Lights> {
        const rootApi = await this.getRootApi();
        return rootApi.lights;
    }

    getAll(): Promise<LightModel[]> {
        return getRepository(LightEntity).find();
    }

    async changeColor(lightId: number, red: number, green: number, blue: number, brightness: number): Promise<any> {
        const lightState = new LightState()
            .on(true)
            .rgb(red, green, blue)
            .brightness(brightness);

        return (await this.getApi()).setLightState(lightId, lightState);
    }

    async onOff(lightId: number, on: boolean): Promise<any> {
        const lightState = new LightState().on(on);

        return (await this.getApi()).setLightState(lightId, lightState);
    }

    async createOrUpdateAll(): Promise<LightModel[]> {
        const api = await this.getApi();
        const all: Light[] = await api.getAll();
        const repository = getRepository(LightEntity);

        return await Promise.all(all.map(async light => {
            return await repository
                .createQueryBuilder()
                .select()
                .addSelect(['id'])
                .where('light_id = ' + light.id)
                .getOne().then(existingLight => {
                    const toUpdateLight: LightEntity = existingLight ? existingLight : repository.create();

                    toUpdateLight.name = light.name;
                    toUpdateLight.light_id = light.id;

                    getLogger().debug('[HUE] LightService - '
                        + (existingLight ? 'Updating ' : 'Creating ')
                        + JSON.stringify(toUpdateLight));

                    return repository.save(toUpdateLight);
                });
        }));
    }
}
