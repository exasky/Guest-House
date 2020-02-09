import {Max, Min} from 'class-validator';
import {CheckableDto} from '../../../common/middleware/check-dto-request.middleware';
import {Constant} from '../../../utils/constant';

export class ColorDto implements CheckableDto {
    lightId: number;

    @Min(0, {message: Constant.ERROR.HUE.LIGHT.RED.MIN})
    @Max(255, {message: Constant.ERROR.HUE.LIGHT.RED.MAX})
    red: number;

    @Min(0, {message: Constant.ERROR.HUE.LIGHT.GREEN.MIN})
    @Max(255, {message: Constant.ERROR.HUE.LIGHT.GREEN.MAX})
    green: number;

    @Min(0, {message: Constant.ERROR.HUE.LIGHT.BLUE.MIN})
    @Max(255, {message: Constant.ERROR.HUE.LIGHT.BLUE.MAX})
    blue: number;

    @Min(0, {message: Constant.ERROR.HUE.LIGHT.BRIGHTNESS.MIN})
    @Max(100, {message: Constant.ERROR.HUE.LIGHT.BRIGHTNESS.MAX})
    brightness: number;

    constructor() {
    }

    toDto(json: any): ColorDto {
        const colorDto = new ColorDto();

        colorDto.lightId = json.lightId;
        colorDto.red = json.red;
        colorDto.green = json.green;
        colorDto.blue = json.blue;
        colorDto.brightness = json.brightness;

        return colorDto;
    }
}
