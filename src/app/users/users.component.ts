import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    _id: '',
    name: '',
    email: '',
    login: '',
    password: ''
  };

  editingUser: User | null = null;
  editUser(user: User): void {
    this.editingUser = { ...user }; // Копируем пользователя в форму
  }

  updateUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser._id, this.editingUser).subscribe(() => {
        this.getUsers();
        this.editingUser = null; // Сбрасываем форму
      });
    }
  }


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(res => {
      if (res.success) {
        this.getUsers();
        this.newUser = {_id: '', name: '', email: '', login: '', password: '' };

      }
    });
  }

// Удалить пользователя
  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers(); // Перезагрузить список после удаления
    });
  }


}
