import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth-guard';
import { FavMovieComponent } from './fav-movie/fav-movie.component';

const routes: Routes = [
  {
    path: 'fav-movies',
    component: FavMovieComponent,
    data:{
      requiredAuth: true
    },
    //canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
