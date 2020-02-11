import Api from 'node-hue-api/lib/api/Api';
import {HueCommonService} from './hue.common.service';
import {getConfiguration, getLogger} from '../../utils/utils';

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
    private hueApi = require('node-hue-api').v3.api;

    private constructor() {
        super();
    }

    getApi(): Promise<Api> {
        return this.getRootApi();
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Method to call only one time to get hue user and key. Those variables must be put in the config.yml under hue.(user|key)
     */
    async retrieveHueUserAndKey() {
        const configuration = getConfiguration();
        const ipAddress = await this.discoverBridge();

        // Create an unauthenticated instance of the Hue API so that we can create a new user
        const unauthenticatedApi: Api = await this.hueApi.createLocal(ipAddress).connect();

        let createdUser;
        try {
            createdUser = await unauthenticatedApi.users.createUser(configuration.appName, configuration.hue.deviceName);
            getLogger().info('*******************************************************************************');
            getLogger().info('User has been created on the Hue Bridge. The following username can be used to\n' +
                'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
                'YOU SHOULD TREAT THIS LIKE A PASSWORD');
            getLogger().info(`Hue Bridge User: ${createdUser.username}`);
            getLogger().info(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
            getLogger().info('*******************************************************************************\n');

            // Create a new API instance that is authenticated with the new user we created
            const authenticatedApi = await this.hueApi.createLocal(ipAddress).connect(createdUser.username);

            // Do something with the authenticated user/api
            const bridgeConfig = await authenticatedApi.configuration.get();
            getLogger().info(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);

        } catch (err) {
            if (err.getHueErrorType() === 101) {
                getLogger().error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
            } else {
                getLogger().error(`Unexpected Error: ${err.message}`);
            }
        }
    }
}
