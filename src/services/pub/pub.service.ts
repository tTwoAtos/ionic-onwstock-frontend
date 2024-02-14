import { Injectable } from '@angular/core';
import { PubInterfaceService } from './interfaces/pub.interface.service';

@Injectable({
  providedIn: 'root'
})

export class PubService implements PubInterfaceService {
  constructor() { }
}
