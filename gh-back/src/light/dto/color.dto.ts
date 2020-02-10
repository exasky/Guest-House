import {Max, Min} from 'class-validator';
import {CheckableDto} from '../../common/middleware/check-dto-request.middleware';
import {Constant} from '../../utils/constant';

export class ColorDto implements CheckableDto {
    manufacturer: string;
    lightId: number;

    @Min(0, {message: Constant.ERROR.LIGHT.RED.MIN})
    @Max(255, {message: Constant.ERROR.LIGHT.RED.MAX})
    red: number;

    @Min(0, {message: Constant.ERROR.LIGHT.GREEN.MIN})
    @Max(255, {message: Constant.ERROR.LIGHT.GREEN.MAX})
    green: number;

    @Min(0, {message: Constant.ERROR.LIGHT.BLUE.MIN})
    @Max(255, {message: Constant.ERROR.LIGHT.BLUE.MAX})
    blue: number;

    @Min(0, {message: Constant.ERROR.LIGHT.BRIGHTNESS.MIN})
    @Max(100, {message: Constant.ERROR.LIGHT.BRIGHTNESS.MAX})
    brightness: number;

    constructor() {
    }

    toDto(json: any): ColorDto {
        const colorDto = new ColorDto();

        colorDto.lightId = json.lightId;
        colorDto.manufacturer = json.manufacturer;
        colorDto.red = json.red;
        colorDto.green = json.green;
        colorDto.blue = json.blue;
        colorDto.brightness = json.brightness;

        return colorDto;
    }
}
