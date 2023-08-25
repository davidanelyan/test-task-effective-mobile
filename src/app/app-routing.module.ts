import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostDetailsComponent } from './posts-list/post-details/post-details.component';
import { UserService } from './services/user.service';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts-list/posts-list.component').then(
        (com) => com.PostsListComponent
      ),
    canActivate: [
      () =>
        inject(UserService).isLoggedIn()
          ? true
          : inject(Router).navigate(['auth']),
    ],
    children: [{ path: ':id', component: PostDetailsComponent }],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
    canActivate: [
      () =>
        inject(UserService).isLoggedIn()
          ? inject(Router).navigate(['posts'])
          : true,
    ],
  },
  { path: '**', redirectTo: 'posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
