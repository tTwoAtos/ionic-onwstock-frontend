import { Observable } from 'rxjs'

export interface GetPub {
    getPub(): Observable<any>
}