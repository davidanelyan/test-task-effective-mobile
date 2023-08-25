import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserService } from '../../services/user.service';
import { loginUser } from '../../interfaces/user.interface';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  hide: boolean = true;

  authForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    pass: new FormControl(null, Validators.required),
  });

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  public onSubmit(): void {
    if (this.authForm.valid) {
      const user: loginUser = {
        username: this.authForm.value.username,
        password: this.authForm.value.pass,
      };
      this.userService.login(user);
      if (!JSON.parse(localStorage.getItem('isLoggedIn'))) {
        this.openSnackBar('Invalid fields', 'Close');
      }
      this.authForm.reset();
    } else {
      this.openSnackBar('Fields is not filled', 'Close');
    }
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
