import { Injectable } from "@angular/core";
import { Constants } from "../util/Constant";
import { Http, Headers } from '@angular/http';
import { Checkin } from "../models/Checkin";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CheckinService {
    public base_url: string = Constants.API_HOST;

    constructor(private _http: Http) {}

    checkin(checkin: Checkin): Observable<any> {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type','application/json');
        
        return this._http.post(this.base_url + 'checkin', JSON.stringify(checkin), { headers: headers })
            .map(response => response.json());
    }
}