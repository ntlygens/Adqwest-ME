import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
selector: 'app-navbar',
standalone: true,
imports: [CommonModule, RouterLink, RouterLinkActive],
template: `
  <nav class="navbar">
    <div class="navbar-content">
    <div class="logo"> Adqwest-ME</div>
    <ul class="nav-links">
      <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
      <li><a routerLink="/about" routerLinkActive="active">About</a></li>
      <li><a routerLink="/services" routerLinkActive="active">Services</a></li>
      <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
    </ul>
    </div>
  </nav>
`,
styles: [`
    .navbar {
      background: white;
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      .navbar-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      }
      .logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(135deg, #0066FF, #00D4FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      }
      .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      }
      .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
      }
      .nav-links a:hover,
      .nav-links a.active {
      color: #0066FF;
      }
      @media (max-width: 768px) {
      .nav-links { gap: 1rem; font-size: 0.9rem; }
      }
  `]
})
export class NavbarComponent {}