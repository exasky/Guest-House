import {getLogger} from '../../../utils/utils';
import Lights from 'node-hue-api/lib/api/Lights';
import Light from 'node-hue-api/lib/model/Light';
import {HueCommonService} from '../hue.common.service';
import {getRepository} from 'typeorm';
import LightState from 'node-hue-api/lib/model/lightstate/LightState';
import {ILightService} from '../../../core/light/light.service';
import {LightDetailModel, LightModel} from '../../../core/light/light';
import {LightEntity} from '../../../core/light/entity/light.entity';

export class HueLightService extends HueCommonService<Lights> implements ILightService {

    constructor() {
        super();
    }

    getApi(): Promise<Lights> {
        return this.getRootApi().then(api => {
            return api.lights;
        });
    }

    getDetails(lightId: string): Promise<LightDetailModel> {
        return this.getApi().then(api => {
            return api.getLightState(lightId).then(lightState => {
                const on = lightState.on;
                const brightness = lightState.bri;
                const hsVtoRGB = HueLightService.xybToRgb(lightState['xy'][0], lightState['xy'][1], brightness);

                return {
                    on: on,
                    red: hsVtoRGB.r,
                    green: hsVtoRGB.g,
                    blue: hsVtoRGB.b,
                    brightness
                }
            })
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

    private static xybToRgb(x: number, y: number, bri: number){
        let z = 1.0 - x - y;
        let Y = bri / 255.0; // Brightness of lamp
        let X = (Y / y) * x;
        let Z = (Y / y) * z;
        let r = X * 1.612 - Y * 0.203 - Z * 0.302;
        let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
        let b = X * 0.026 - Y * 0.072 + Z * 0.962;
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        let maxValue = Math.max(r,g,b);
        r /= maxValue;
        g /= maxValue;
        b /= maxValue;
        r = r * 255;   if (r < 0) { r = 255 }
        g = g * 255;   if (g < 0) { g = 255 }
        b = b * 255;   if (b < 0) { b = 255 }
        return {
            r :r,
            g :g,
            b :b
        }
    }
}
