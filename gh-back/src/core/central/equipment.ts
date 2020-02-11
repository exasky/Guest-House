/**
 * Main interface to declare an equipment (such as Light, light switch, etc...)
 * @see #LightModel
 */
export interface EquipmentModel {
    id?: number;
    name: string;
    manufacturer: string;
    /**
     * Type of an equipment (such as Light, Roller shutter, etc...)
     */
    type: DeviceType;
}

export enum DeviceType {
    LIGHT = 'LIGHT'
}
