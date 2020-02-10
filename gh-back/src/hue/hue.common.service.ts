import Api from 'node-hue-api/lib/api/Api';
import {getConfiguration, getLogger} from '../utils/utils';
import ApiDefinition from 'node-hue-api/lib/api/http/ApiDefinition';

const v3 = require('node-hue-api').v3
    , discovery = v3.discovery
    , hueApi = v3.api
;

export abstract class HueCommonService<A extends ApiDefinition | Api> {
    async discoverBridge() {
        const discoveryResults = await discovery.nupnpSearch();

        if (discoveryResults.length === 0) {
            getLogger().error('Failed to resolve any Hue Bridges');
            return null;
        } else {
            // Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
            return discoveryResults[0].ipaddress;
        }
    }

    async getRootApi(): Promise<Api> {
        const configuration = getConfiguration();
        const ipAddress = await this.discoverBridge();

        return await hueApi.createLocal(ipAddress).connect(configuration.hue.user);
    }

    abstract getApi(): Promise<A>;
}
