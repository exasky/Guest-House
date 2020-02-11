import express = require('express');
import * as path from 'path';

import LoginRoutes from './login/login.route';
import CentralRoutes from './core/central/central.route';
import LightRoutes from './core/light/light.route';

import {LightService} from './core/light/light.service';
import {HueLightService} from './plugins/hue/light/hue-light.service';
import {CentralService} from './core/central/central.service';

export function configure(app: express.Application) {
    // Serve files from built front
    app.use(express.static(path.join(__dirname, '__front__')));

    app.use('/api', LoginRoutes);
    app.use('/api', CentralRoutes);
    app.use('/api', LightRoutes);

    app.use('*', express.static(path.join(__dirname, '__front__')));
}

export function registerServices() {
    LightService.getInstance().registerService('Philips', new HueLightService());

    CentralService.getInstance().registerService(LightService.getInstance());
}
