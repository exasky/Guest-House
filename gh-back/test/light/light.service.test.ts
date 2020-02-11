import {LightService} from '../../src/core/light/light.service';
import {Manufacturer} from '../../src/common/manufacturer/manufacturer.service';
import {HueLightService} from '../../src/plugins/hue/light/hue-light.service';

describe('manual test for light', () => {
    LightService.getInstance().registerService(Manufacturer.PHILLIPS, new HueLightService());
    (async () => {
        await LightService.getInstance().changeColor(Manufacturer.PHILLIPS, 6, 255,0,0,100);
        await LightService.getInstance().changeColor(Manufacturer.PHILLIPS, 6, 0,255,0,100);
        await LightService.getInstance().changeColor(Manufacturer.PHILLIPS, 6, 0,0,255,100);
        await LightService.getInstance().changeColor(Manufacturer.PHILLIPS, 6, 255,255,0,100);
        await LightService.getInstance().changeColor(Manufacturer.PHILLIPS, 6, 255,0,255,100);
    })();
});
