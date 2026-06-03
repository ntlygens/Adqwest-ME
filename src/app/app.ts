import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="app">
      <router-outlet />
    </main>
  `,
  styles: [`
    .app {
      display: flex;
      flex-direction: column;
      height: 100vh;

      padding: 10px 20px;
      justify-content: flex-start; 
      margin: 0 0 3rem;
    }
  `]
})
export class App {
  protected readonly title = signal('adqwest-me');
}
