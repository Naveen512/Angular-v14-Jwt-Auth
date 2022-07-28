import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //canActivate:[AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((_) => _.AuthModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then((_) => _.MoviesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
