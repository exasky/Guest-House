import {configure} from "./configure";

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');

import express = require('express');
import morgan = require('morgan');

export class App {

    private readonly app: express.Application;

    constructor() {
        this.app = express();

        this.registerMiddleware();

        configure(this.app);

        this.addErrorHandlers();
    }

    registerMiddleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    addErrorHandlers() {
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createError(404));
        });

        // // error handler
        // this.app.use(function (err, req, res, next) {
        //     // set locals, only providing error in development
        //     res.locals.message = err.message;
        //     res.locals.error = req.app.get('env') === 'development' ? err : {};
        //
        //     // render the error page
        //     res.status(err.status || 500);
        //     res.render('error');
        // });
    }

    set(setting: string, value: any) {
        this.app.set(setting, value);
    }

    getApp() {
        return this.app;
    }
}
