import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {environment} from "../environments/environments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }

}
