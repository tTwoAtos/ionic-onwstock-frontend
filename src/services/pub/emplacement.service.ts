import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emplacement } from 'src/types/emplacement.type';

@Injectable({
  providedIn: 'root'
})

export class EmplacementsService {
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the list of Emplacements from the server.
   * @returns An Observable that emits the response containing the Emplacements.
   */
  getAll(communityId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')
    return this.http.get(environment.API_URL + '/emplacement/community/' + communityId, { headers: headers })
  }

  async count(emplacementId: number, communityId: string): Promise<number> {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')

    const request = this.http.get(environment.API_URL + '/product-to-community/' + communityId + '/' + emplacementId + "/count", { headers: headers }).pipe(take(1))
    return await lastValueFrom<any>(request)
  }

  async add(emplacement: Emplacement) {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')

    const request = this.http.post(environment.API_URL + '/emplacement', {
      ...emplacement
    }, { headers: headers }).pipe(take(1))

    return await lastValueFrom<any>(request)
  }

  async delete(emplacementId: number) {
    const headers = new HttpHeaders()
      .set('ngrok-skip-browser-warning', 'true')

    const request = this.http.delete(environment.API_URL + '/emplacement/' + emplacementId, {
      headers: headers
    }).pipe(take(1))

    return await lastValueFrom<any>(request)
  }
}
