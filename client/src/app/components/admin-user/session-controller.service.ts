// session-controller.service.ts

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SessionControllerService {
    private apiUrl = `${environment.baseUrl}/users`;

    constructor(private httpClient: HttpClient) { }

    cookieLogin(email: string, password: string) {
        return this.httpClient.post(
            `${this.apiUrl}/cookie-login`,
            { email, password },
            {
                withCredentials: true,
                responseType: 'text'
            }
        );
    }

    getCookieProfile() {
        return this.httpClient.get(
            `${this.apiUrl}/cookie-user`,
            {
                withCredentials: true,
                responseType: 'text'
            }
        );
    }

    cookieLogout() {
        return this.httpClient.post(
            `${this.apiUrl}/logout`,
            {},
            {
                withCredentials: true,
                responseType: 'text'
            }
        );
    }
}