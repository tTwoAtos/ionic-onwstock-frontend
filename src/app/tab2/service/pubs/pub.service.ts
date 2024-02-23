import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPubInterfaceService } from './interface/pub.interface.service';

@Injectable({
  providedIn: 'root'
})

export class PubService implements IPubInterfaceService {
  constructor(private http: HttpClient) { }
  getPub(): Observable<any> {
    return this.http.get(environment.API_URL + '/pubs')
  }
}
