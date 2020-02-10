export class ManufacturerService {

    static getInstance() {
        if (!ManufacturerService._instance) {
            ManufacturerService._instance = new ManufacturerService();
        }
        return ManufacturerService._instance;
    }

    private static _instance: ManufacturerService;

    private manufacturers: string[];

    constructor() {
        this.manufacturers = [];
    }

    addManufacturer(manufacturer: string) {
        this.manufacturers.push(manufacturer);
    }

    getManufacturers(): string[] {
        return this.manufacturers;
    }
}

// TODO maybe extended ? or maybe leave the manufacturer list to ManufacturerService constructor to let people choose their manufacturer
export enum Manufacturer {
    PHILLIPS = 'Philips'
}
