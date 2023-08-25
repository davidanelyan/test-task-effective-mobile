import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { loginUser, singupUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = signal(false);

  constructor(private router: Router) {
    this.setItemInlocalStorage(JSON.parse(localStorage.getItem('isLoggedIn')));
  }

  public signup(user: singupUser): void {
    localStorage.setItem(user.username, JSON.stringify(user));
    this.login(user);
  }

  public login(userData: loginUser): void {
    const singupUser: loginUser = JSON.parse(
      localStorage.getItem(userData.username)
    );
    if (!singupUser) return;
    if (
      singupUser.username === userData.username &&
      singupUser.password === userData.password
    ) {
      this.setItemInlocalStorage(true);
      this.router.navigate(['posts']);
    } else {
      this.setItemInlocalStorage(false);
    }
  }

  public logout(): void {
    this.setItemInlocalStorage(false);
    this.router.navigate(['auth']);
  }

  private setItemInlocalStorage(hasLogged: boolean) {
    localStorage.setItem('isLoggedIn', JSON.stringify(hasLogged));
    this.isLoggedIn.set(hasLogged);
  }
}
