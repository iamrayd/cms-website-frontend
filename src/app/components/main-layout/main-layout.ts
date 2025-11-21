import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule, NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
 
    CommonModule,
    NgClass,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayoutComponent implements OnDestroy {
  
  sidebarOpen = true; 
  isDesktopCollapsed = false;
  isAdmin = false;
  private destroy$ = new Subject<void>();

  constructor(private auth: AuthService) {
    this.auth.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.isAdmin = user?.role === 'admin');
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleDesktopSidebar() {
    this.isDesktopCollapsed = !this.isDesktopCollapsed;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
