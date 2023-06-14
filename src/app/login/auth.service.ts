import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {environment} from "../environments/environments";
import {Observable, tap} from "rxjs";

interface User {
  id: number;
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { username, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }


  getCurrentToken(): string | null {
    return localStorage.getItem('access_token');
  }

}
