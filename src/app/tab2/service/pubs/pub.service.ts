import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPubInterfaceService } from './interface/pub.interface.service';
import { communityId } from 'src/const';

@Injectable({
  providedIn: 'root'
})

export class PubService implements IPubInterfaceService {
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the pub data from the server.
   * @returns An Observable that emits the pub data.
   */
  getPub(): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_URL + '/pubs/'+communityId, { headers: headers })
  }
}
