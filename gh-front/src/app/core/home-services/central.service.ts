import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {DeviceType, EquipmentModel} from "../model/equipmentModel";

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<EquipmentModel[]> {
    return this.http.get<EquipmentModel[]>(environment.serverUrl + '/home-services/all');
  }

  getEquipmentTypes(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>(environment.serverUrl + '/home-services/types');
  }
}
