import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../../environments/environment";
import {LightModel} from "../model/light";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<LightModel[]> {
    return this.http.get<LightModel[]>(environment.serverUrl + '/light/all');
  }
}