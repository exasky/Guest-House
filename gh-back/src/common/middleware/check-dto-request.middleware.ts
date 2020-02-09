import {NextFunction, Request, Response} from 'express';
import {constants} from 'http2';
import {validate, ValidationError} from 'class-validator';
import {flatMap} from 'tslint/lib/utils';

export function checkDtoRequest<A extends CheckableDto>(dummyInstance: A) {
    return (req: Request, res: Response, next: NextFunction) => {
        const checkableDto = dummyInstance.toDto(req.body);

        validate(checkableDto).then(errors => {
            const myErrors = toMyValidationError(errors);
            if (errors.length > 0) {
                return res.status(constants.HTTP_STATUS_BAD_REQUEST).send(myErrors);
            } else {
                next();
                return;
            }
        });
    };
}

export interface CheckableDto {
    toDto(json: any): CheckableDto;
}

export class MyValidationError {
    message: string;
    property: string;
    value: string;

    constructor(message: string, property: string, value: string) {
        this.message = message;
        this.property = property;
        this.value = value;
    }
}

function toMyValidationError(errors: ValidationError[]): MyValidationError[] {
    return flatMap(errors, ve => {
        return Object.values(ve.constraints).map(constr => new MyValidationError(constr, ve.property, ve.value));
    });
}
