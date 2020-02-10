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
