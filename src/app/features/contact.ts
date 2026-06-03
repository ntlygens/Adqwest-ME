import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../core-comps/navbar';
import { Footer } from '../core-comps/footer';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, Footer],
  template: `
    <app-navbar></app-navbar>

    <section class="contact-section">
      <div class="contact-content">
        <h1 class="contact-title">Let's Get You Set Up</h1>
        <p class="contact-subtitle">
          Schedule a demo, ask questions, or learn how Adqwest-ME can transform your organization.
        </p>

        <div class="contact-container">
          <div class="contact-form">
            <h2>Schedule Your Demo</h2>

            <div *ngIf="submitted()" class="success-message">
              <h3>✓ Success!</h3>
              <p>We received your demo request. Our team will contact you within 24 hours.</p>
            </div>

            <div *ngIf="error()" class="error-message">
              {{ error() }}
            </div>

            <form (ngSubmit)="onSubmit()" *ngIf="!submitted()">
              <div class="form-group">
                <label for="name">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  [(ngModel)]="formData.name" 
                  name="name" 
                  placeholder="John Doe"
                  required>
              </div>

              <div class="form-group">
                <label for="company">Organization Name *</label>
                <input 
                  type="text" 
                  id="company" 
                  [(ngModel)]="formData.company" 
                  name="company" 
                  placeholder="Your School/Facility/Hotel"
                  required>
              </div>

              <div class="form-group">
                <label for="market">Market *</label>
                <select 
                  id="market" 
                  [(ngModel)]="formData.market" 
                  name="market" 
                  required>
                  <option value="">Select your market</option>
                  <option *ngFor="let market of markets" [value]="market.value">
                    {{ market.label }}
                  </option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    [(ngModel)]="formData.email" 
                    name="email" 
                    placeholder="you@organization.com"
                    required>
                </div>

                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    [(ngModel)]="formData.phone" 
                    name="phone" 
                    placeholder="(555) 123-4567">
                </div>
              </div>

              <div class="form-group">
                <label for="message">Message (Optional)</label>
                <textarea 
                  id="message" 
                  [(ngModel)]="formData.message" 
                  name="message" 
                  placeholder="Tell us about your specific needs..."
                  rows="5"></textarea>
              </div>

              <button 
                type="submit" 
                class="submit-button"
                [disabled]="loading()">
                {{ loading() ? 'Submitting...' : 'Schedule Demo' }}
              </button>
            </form>
          </div>

          <div class="contact-info">
            <h2>Why Demo with Us?</h2>

            <div class="info-item">
              <div class="info-icon">⚡</div>
              <h4>Lightning-Fast Setup</h4>
              <p>See your content live in the platform within hours of signing up.</p>
            </div>

            <div class="info-item">
              <div class="info-icon">👥</div>
              <h4>Expert Team</h4>
              <p>Our specialists understand your market and can customize the solution for you.</p>
            </div>

            <div class="info-item">
              <div class="info-icon">🎯</div>
              <h4>Zero Risk Trial</h4>
              <p>30-day free trial on any plan. No credit card required to start.</p>
            </div>

            <div class="info-item">
              <div class="info-icon">🚀</div>
              <h4>Quick Go-Live</h4>
              <p>Most customers are fully operational within 1-2 weeks of signing up.</p>
            </div>

            <div class="faq">
              <h3>Frequently Asked Questions</h3>
              
              <div class="faq-item">
                <h5>How long does it take to set up?</h5>
                <p>Most organizations are up and running within 1-2 weeks. We handle all the technical heavy lifting.</p>
              </div>

              <div class="faq-item">
                <h5>Can I customize the content?</h5>
                <p>Absolutely. You have complete control over what content appears on your platform.</p>
              </div>

              <div class="faq-item">
                <h5>What about training?</h5>
                <p>We provide comprehensive training for your team and ongoing support via email, phone, and chat.</p>
              </div>

              <div class="faq-item">
                <h5>Is there a long-term contract?</h5>
                <p>No. Start with a 30-day free trial, then month-to-month or annual plans with no lock-in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    .contact-section {
      background: #f8f9fa;
      padding: 4rem 2rem;
      min-height: calc(100vh - 100px);
    }

    .contact-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .contact-title {
      font-size: 2.5rem;
      color: #0a0e27;
      margin-bottom: 1rem;
      text-align: center;
    }

    .contact-subtitle {
      font-size: 1.1rem;
      color: #666;
      text-align: center;
      margin-bottom: 3rem;
    }

    .contact-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .contact-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    }

    .contact-form h2 {
      color: #0a0e27;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .success-message {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #4caf50;
    }

    .success-message h3 {
      margin: 0 0 0.5rem 0;
    }

    .success-message p {
      margin: 0;
    }

    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #f44336;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #0a0e27;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #0066FF;
      box-shadow: 0 0 0 3px rgba(0,102,255,0.1);
    }

    .form-group textarea {
      resize: vertical;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .submit-button {
      background: linear-gradient(135deg, #0066FF, #00D4FF);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,102,255,0.3);
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .contact-info {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    }

    .contact-info h2 {
      color: #0a0e27;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .info-item {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #eee;
    }

    .info-item:last-of-type {
      border-bottom: none;
    }

    .info-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .info-item h4 {
      color: #0a0e27;
      margin-bottom: 0.5rem;
    }

    .info-item p {
      color: #666;
      margin: 0;
    }

    .faq {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #f0f0f0;
    }

    .faq h3 {
      color: #0a0e27;
      margin-bottom: 1.5rem;
    }

    .faq-item {
      margin-bottom: 1.5rem;
    }

    .faq-item h5 {
      color: #0066FF;
      margin-bottom: 0.5rem;
    }

    .faq-item p {
      color: #666;
      margin: 0;
      font-size: 0.9rem;
    }

    @media (max-width: 968px) {
      .contact-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .contact-section { padding: 2rem 1rem; }
      .contact-title { font-size: 1.8rem; }
      .contact-form, .contact-info { padding: 1.5rem; }
    }
    `]
})
export class ContactComponent {
  formData = {
    name: '',
    company: '',
    market: '',
    email: '',
    phone: '',
    message: ''
  };

  submitted = signal(false);
  loading = signal(false);
  error = signal('');

  markets = [
    { label: 'Schools & Education', value: 'schools' },
    { label: 'Senior Living', value: 'senior_living' },
    { label: 'Hotels & Hospitality', value: 'hotels' },
    { label: 'Other', value: 'other' }
  ];

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.validateForm()) {
      this.loading.set(true);
      this.error.set('');

      this.apiService.submitDemoRequest(this.formData).subscribe({
        next: (response) => {
          this.loading.set(false);
          this.submitted.set(true);
          this.resetForm();

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitted.set(false);
          }, 5000);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.error?.error || 'Failed to submit request. Please try again.');
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.formData.name.trim()) {
      this.error.set('Please enter your name');
      return false;
    }
    if (!this.formData.company.trim()) {
      this.error.set('Please enter your organization name');
      return false;
    }
    if (!this.formData.market) {
      this.error.set('Please select your market');
      return false;
    }
    if (!this.formData.email.trim()) {
      this.error.set('Please enter your email');
      return false;
    }
    if (!this.isValidEmail(this.formData.email)) {
      this.error.set('Please enter a valid email address');
      return false;
    }
    return true;
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  resetForm() {
    this.formData = { name: '', company: '', market: '', email: '', phone: '', message: '' };
  }
}



export class Contact {}
