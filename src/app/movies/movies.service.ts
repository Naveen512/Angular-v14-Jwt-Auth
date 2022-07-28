import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavMovie } from './fav-movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  getFavMovies() {
    return this.httpClient.get<FavMovie[]>('http://localhost:3000/user/fav-movies');
  }
}
