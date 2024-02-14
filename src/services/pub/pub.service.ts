import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PubInterfaceService } from './interfaces/pub.interface.service';

@Injectable({
  providedIn: 'root'
})

export class PubService implements PubInterfaceService {
  private apiBaseUrl = 'https://world.openfoodfacts.org/api/v0/product/';

  constructor(private http: HttpClient) {

  }
}
