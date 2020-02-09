import Api from 'node-hue-api/lib/api/Api';
import {HueCommonService} from './common/hue.common.service';
import {getConfiguration} from '../utils/utils';
import ApiDefinition from 'node-hue-api/lib/api/http/ApiDefinition';
import {LightService} from './light/light.service';

const hueApi = require('node-hue-api').v3.api;

export class HueService extends HueCommonService<Api> {

    // TODO getApi.groups.getRooms => Init groups
    // TODO getApi.groups.getZones => Init zones ?

    static getInstance() {
        if (!HueService._instance) {
            HueService._instance = new HueService();
        }
        return HueService._instance;
    }

    private static _instance: HueService;

    private constructor() {
        super();
        this.services = new Map<HueServicesEnum, HueCommonService<ApiDefinition | Api>>();

        this.registerFeature(HueServicesEnum.ROOT, this);
        this.registerFeature(HueServicesEnum.LIGHT, new LightService());
    }

    private services: Map<HueServicesEnum, HueCommonService<ApiDefinition | Api>>;

    getApi(): Promise<Api> {
        return this.getRootApi();
    }

    registerFeature(type: HueServicesEnum, service: HueCommonService<ApiDefinition | Api>) {
        this.services.set(type, service);
    }

    getFeature(type: HueServicesEnum): HueCommonService<ApiDefinition | Api> {
        return this.services.get(type);
    }

    get lights(): LightService {
        return this.getFeature(HueServicesEnum.LIGHT) as LightService;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Method to call only one time to get hue user and key. Those variables must be put in the config.yml under hue.(user|key)
     */
    async retrieveHueUserAndKey() {
        const configuration = getConfiguration();
        const ipAddress = await this.discoverBridge();

        // Create an unauthenticated instance of the Hue API so that we can create a new user
        const unauthenticatedApi: Api = await hueApi.createLocal(ipAddress).connect();

        let createdUser;
        try {
            createdUser = await unauthenticatedApi.users.createUser(configuration.appName, configuration.hue.deviceName);
            console.log('*******************************************************************************\n');
            console.log('User has been created on the Hue Bridge. The following username can be used to\n' +
                'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
                'YOU SHOULD TREAT THIS LIKE A PASSWORD\n');
            console.log(`Hue Bridge User: ${createdUser.username}`);
            console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
            console.log('*******************************************************************************\n');

            // Create a new API instance that is authenticated with the new user we created
            const authenticatedApi = await hueApi.createLocal(ipAddress).connect(createdUser.username);

            // Do something with the authenticated user/api
            const bridgeConfig = await authenticatedApi.configuration.get();
            console.log(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);

        } catch (err) {
            if (err.getHueErrorType() === 101) {
                console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
            } else {
                console.error(`Unexpected Error: ${err.message}`);
            }
        }
    }
}

export enum HueServicesEnum {
    ROOT, LIGHT
}
