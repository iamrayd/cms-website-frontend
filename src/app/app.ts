import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Signin } from './Sign-in/sign-in';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Signin, Footer],
  template: `
    <app-header/>
    <main>
      <app-home/>
    </main>
    <router-outlet />
    <app-footer/>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('test-app');
}
