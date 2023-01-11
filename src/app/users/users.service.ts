import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  private baseUrl = 'https://localhost:44354/api/User/';
  getFavMovies() {
    return this.httpClient.get<User[]>(this.baseUrl + 'Get');
  }
}
