import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <h3>Adqwest-ME</h3>
        <p style="margin-top: 1rem;">Smart Media Solutions for Schools, Senior Living, and Hospitality</p>
        <p style="margin-top: 2rem; opacity: 0.7;">© 2026 Adqwest-ME. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
      .footer {
        background: #0a0e27;
        color: white;
        padding: 3rem 2rem;
        text-align: center;
      }

      .footer-content {
        max-width: 1400px;
        margin: 0 auto;
      }
  `]
})
export class Footer {}
