import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile, UpdateProfileRequest, ChangePasswordRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://localhost:7211/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserInfo(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/Account/Info`, {
      headers: this.getHeaders()
    });
  }

  updateProfile(updateRequest: UpdateProfileRequest): Observable<any> {
    return this.http.put(`${this.API_URL}/Account/UpdateInfo`, updateRequest, {
      headers: this.getHeaders()
    });
  }

  changePassword(changeRequest: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${this.API_URL}/Account/ChangePassword`, changeRequest, {
      headers: this.getHeaders()
    });
  }

  getUser(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/Account/GetUser?Id=${id}`, {
      headers: this.getHeaders()
    });
  }

  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.API_URL}/Account/GetAllUsers`, {
      headers: this.getHeaders()
    });
  }
}
