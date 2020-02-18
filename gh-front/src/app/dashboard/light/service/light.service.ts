import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../../environments/environment";
import {LightDetailModel, LightModel} from "../model/light";
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

  getDetail(id: number | string): Observable<LightDetailModel> {
    return this.http.get<LightDetailModel>(environment.serverUrl + '/light/detail/' + id);
  }

  onOff(on: boolean, manufacturer: string, lightId: number): Observable<boolean> {
    return this.http.post<any>(environment.serverUrl + '/light/' + (on ? 'on' : 'off'), {
      id: lightId,
      manufacturer: manufacturer
    });
  }

  changeColor(hexColor: string, brightness: number, light: LightDetailModel): Observable<any> {
    const rgb = this.hexToRgb(hexColor);
    return this.http.post<any>(environment.serverUrl + '/light/change-color', {
      manufacturer: light.manufacturer,
      lightId: light.lightId,
      red: rgb.r,
      green: rgb.g,
      blue: rgb.b,
      brightness
    });
  }

  rgbToHex(r: number, g: number, b: number): string {
    let rHex = Math.round(Number(r)).toString(16);
    if (rHex.length < 2) {
      rHex = "0" + rHex;
    }
    let gHex = Math.round(Number(g)).toString(16);
    if (gHex.length < 2) {
      gHex = "0" + gHex;
    }
    let bHex = Math.round(Number(b)).toString(16);
    if (bHex.length < 2) {
      bHex = "0" + bHex;
    }

    return "#" + rHex + gHex + bHex;
  }

  hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
