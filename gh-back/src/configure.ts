import express = require('express');
import * as path from 'path';

import LoginRoutes from './login/login.route';
import LightRoutes from './light/light.route';

export function configure(app: express.Application) {
    // Serve files from built front
    app.use(express.static(path.join(__dirname, '__front__')));

    app.use('/api', LoginRoutes);
    app.use('/api', LightRoutes);

    app.use('*', express.static(path.join(__dirname, '__front__')));
}
