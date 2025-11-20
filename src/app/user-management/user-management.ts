import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss'],
})
export class UserManagementComponent {
  searchTerm = '';

  readonly users: ManagedUser[] = [
    {
      id: 'USR-001',
      name: 'Lawrence',
      email: 'lawrence@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=5',
    },
    {
      id: 'USR-002',
      name: 'Galvez',
      email: 'galvez@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=12',
    },
    {
      id: 'USR-003',
      name: 'Godinez',
      email: 'godinez@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=6',
    },
    {
      id: 'USR-004',
      name: 'Dingal',
      email: 'dingal@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=15',
    },
    {
      id: 'USR-005',
      name: 'Santa',
      email: 'santa@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=25',
    },
    {
      id: 'USR-006',
      name: 'Halloween',
      email: 'halloween@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=30',
    },
    {
      id: 'USR-007',
      name: 'Magic',
      email: 'magic@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=36',
    },
    {
      id: 'USR-008',
      name: 'Wonderful',
      email: 'wonderful@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=45',
    },
    {
      id: 'USR-009',
      name: 'IBC Auto',
      email: 'ibcauto@gmail.com',
      role: 'Role',
      avatar: 'https://i.pravatar.cc/64?img=55',
    },
  ];

  get filteredUsers(): ManagedUser[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return this.users;
    }
    return this.users.filter(user => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }
}
