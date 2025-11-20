import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'viewer';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    const valid = email === 'galvez@gmail.com' && password === 'admin';
    
    if (valid) {
      const user: User = {
        name: 'Galvez James',
        email: 'Galvez@gmail.com',
        avatar:
          'https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-1/224570019_4882169058494561_8380156668375777092_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeGig9udzX9Q7bCmIoKqkmzskld63bbbx1KSV3rdttvHUkDMPUxUecj_10BQkNPthUW_vrBVzge2eyP8D3QG6sRm&_nc_ohc=OHKF9SafgWMQ7kNvwGGcGL2&_nc_oc=AdnuvVdF3X7tW29eKQscsJtfTyphMpsY-LfMFcPOFQpZDN-Nf-fqaVM4X2hlGm6P0Bc&_nc_zt=24&_nc_ht=scontent.fceb9-1.fna&_nc_gid=vvNFtNHd1NimD19ZvNsxxA&oh=00_AfjNqyavsqsLHc9upTXnwuEcleGz7S1qHa8ATAkIsl-2kg&oe=6921EAC5',
        role: 'admin',
      };
      
      return of({ token: 'mock-token', user }).pipe(
        delay(200),
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        })
      );
    }
    
    return throwError(() => new Error('Incorrect email and/or password'));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/signin']); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  userHasRole(role: User['role']): boolean {
    return this.getCurrentUser()?.role === role;
  }

  isAdmin(): boolean {
    return this.userHasRole('admin');
  }
}
