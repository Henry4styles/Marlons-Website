import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot.interface';

@Injectable({providedIn: 'root'})
export class PilotService {
//fehlerhaftes URL, da es sich um eine lokale Datei handelt
    private _url: string = "https://localhost:5001/getPilots";
    constructor(private http: HttpClient) { }
    
    getPilots(): Observable<Pilot[]>{
        return this.http.get<Pilot[]>(this._url);
    }
}