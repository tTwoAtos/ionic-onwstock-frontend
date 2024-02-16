import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPubInterfaceService } from './interface/pub.interface.service';

@Injectable({
  providedIn: 'root'
})

export class PubService implements IPubInterfaceService {
  private apiUrl = 'http://localhost:5000/api/v1/pubs'
  constructor(private http: HttpClient) { }
  getPub(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
