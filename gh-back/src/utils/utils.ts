import * as logger from "winston";

export function configureLogger() {
    logger.configure({
        level: 'debug',
        transports: [
            new logger.transports.Console({
                format: logger.format.combine(
                    logger.format.colorize(),
                    logger.format.splat(),
                    logger.format.simple()
                )
            })
        ]
    });
}

export function getLogger() {
    return logger;
}

import {safeLoad} from 'js-yaml';
import * as fs from "fs";
export function getConfiguration() {
    return safeLoad(fs.readFileSync('config/config.yml', 'UTF8'));
}
