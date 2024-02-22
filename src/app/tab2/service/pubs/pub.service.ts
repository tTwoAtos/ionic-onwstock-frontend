import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPubInterfaceService } from './interface/pub.interface.service';

@Injectable({
  providedIn: 'root'
})

export class PubService implements IPubInterfaceService {
  private apiUrl = 'https://56df-147-161-180-116.ngrok-free.app/api/v1/pubs'
  constructor(private http: HttpClient) { }
  getPub(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
