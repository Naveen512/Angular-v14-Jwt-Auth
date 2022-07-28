import { Component, OnInit } from '@angular/core';
import { FavMovie } from '../fav-movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-fav-movie',
  templateUrl: './fav-movie.component.html',
  styleUrls: ['./fav-movie.component.css']
})
export class FavMovieComponent implements OnInit {

  constructor(private moviesService:MoviesService) { }

  faveMovies:FavMovie[] = [];

  ngOnInit(): void {
    this.moviesService.getFavMovies()
    .subscribe((data) => {
      this.faveMovies = data;
    })
  }

}
