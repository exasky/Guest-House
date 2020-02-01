#!/usr/bin/env node
import 'reflect-metadata';

import {createServer} from 'http';
import {createConnection} from 'typeorm';
import {App} from './app';
import {createAdminUser } from './utils/database';
import {configureLogger, getConfiguration, getLogger} from './utils/utils';

(async () => {
    try {
        configureLogger();

        const configuration: any = getConfiguration();
        if (configuration.typeorm) {
            const connection = await createConnection(configuration.typeorm);
            await connection.synchronize();
        }

        const app = new App();
        /**
         * Get port from environment and store in Express.
         */
        const port = configuration.port || process.env.PORT || 3000;
        app.set('port', port);

        /**
         * Create HTTP server.
         */
        const server = createServer(app.getApp());
        server.listen(port)
            .on('error', (err) => getLogger().error(err))
            .on('listening', () => {
                const addr = server.address();
                const bind = typeof addr === 'string'
                    ? 'pipe ' + addr
                    : 'port ' + addr.port;
                getLogger().log('debug', 'Listening on ' + bind);
                createAdminUser();
                // populateDatabaseForTests();
            });

    } catch (e) {
        getLogger().error(JSON.stringify(e));
    }
})();
