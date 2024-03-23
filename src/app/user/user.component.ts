import { Component } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userName: string = '';
  password: string = '';
  createdAt: string = '';
  status: string = '';

  constructor(private apiService: ApiService) {}

  createUser(): void {
    const user = {
      userName: this.userName,
      password: this.password,
      createdAt: this.createdAt,
      status: this.status
    };

    this.apiService.createUser(user)
      .subscribe(
        (response) => {
          console.log('User created successfully:', response);
          // Add any further handling here (e.g., showing a success message)
        },
        (error) => {
          console.error('Error creating user:', error);
          // Handle error (e.g., show error message)
        }
      );
  }

}
