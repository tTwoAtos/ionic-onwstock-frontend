import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logins } from 'src/types/logins.type';
import { User } from 'src/types/user.type';
import { Community } from './../types/community.type';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    login(logins: Logins): Promise<User> {
        const headers = new HttpHeaders()
            .set('ngrok-skip-browser-warning', 'true')
        const request = this.http.post(environment.API_URL + '/users/login', logins, { headers: headers })

        return lastValueFrom<any>(request)
    }

    add(user: User): Promise<User> {
        const headers = new HttpHeaders()
            .set('ngrok-skip-browser-warning', 'true')

        const request = this.http.post(environment.API_URL + '/users', {
            ...user
        }, { headers: headers }).pipe(take(1))

        return lastValueFrom<any>(request)
    }

    delete(emplacementId: number): Promise<any> {
        const headers = new HttpHeaders()
            .set('ngrok-skip-browser-warning', 'true')

        const request = this.http.delete(environment.API_URL + '/emplacement/' + emplacementId, {
            headers: headers
        }).pipe(take(1))

        return lastValueFrom<any>(request)
    }

    getCommunities(): Promise<Community[]> {
        const user = this.authUser()
        const headers = new HttpHeaders()
            .set('ngrok-skip-browser-warning', 'true')

        const request = this.http.get(environment.API_URL + '/users/communities/user/' + user.id, {
            headers: headers
        }).pipe(take(100))

        return lastValueFrom<any>(request)
    }

    getUsersFromCommmunity(): Promise<User[]> {
        const user = this.authUser()
        const headers = new HttpHeaders()
            .set('ngrok-skip-browser-warning', 'true')

        const request = this.http.get(environment.API_URL + '/users/communities/' + user.loggedInCommunity.id, {
            headers: headers
        }).pipe(take(100))

        return lastValueFrom<any>(request)
    }

    isValid(): boolean {
        return !!localStorage.getItem('user')
    }
    authUser(): User {
        return JSON.parse(localStorage.getItem('user') ?? "")
    }
}
