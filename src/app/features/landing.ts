import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsService } from '../services/testimonials.service';
import { DisplayComponent } from '../core-comps/display-component';
import { NavbarComponent } from "../core-comps/navbar";
import { Footer } from '../core-comps/footer';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, DisplayComponent, NavbarComponent, Footer],
  template: ` 
    <app-navbar></app-navbar>
    <section class="hero">
      <div class="hero-content">
        <h1>Smart Media Solutions for Every Market</h1>
        <p>Curated content, seamless integration, complete control. Schools. Senior Living. Hospitality.</p>
        <button class="hero-button" (click)="openModal()">Explore Demo</button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Choose Your Market</h2>
      <div class="markets">
        <div class="market-card" *ngFor="let market of markets">
          <div class="market-icon">{{ market.icon }}</div>
          <h3>{{ market.title }}</h3>
          <p>{{ market.description }}</p>
          <button class="market-button" (click)="openModal()">View Demo</button>
        </div>
      </div>
    </section>

    <section class="section" style="background: #f8f9fa;">
      <h2 class="section-title">Why Adqwest-ME</h2>
      <div class="benefits">
        <div style="text-align: center;">
          <h3 style="color: #0066FF; margin-bottom: 1rem;">⚡ Lightning Fast</h3>
          <p>Content delivery on global edge. Always responsive, always available.</p>
        </div>
        <div style="text-align: center;">
          <h3 style="color: #0066FF; margin-bottom: 1rem;">🎯 Fully Customizable</h3>
          <p>Tailor every aspect to match your organization's needs and branding.</p>
        </div>
        <div style="text-align: center;">
          <h3 style="color: #0066FF; margin-bottom: 1rem;">🔒 Secure & Compliant</h3>
          <p>Enterprise-grade security. Your data, your control.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">What Our Users Say</h2>
      <div class="testimonials-grid">
        <div class="testimonial" *ngFor="let testimonial of testimonials">
          <div class="testimonial-text">"{{ testimonial.text }}"</div>
          <div class="testimonial-author">{{ testimonial.author }}</div>
          <div class="testimonial-role">{{ testimonial.role }}</div>
        </div>
      </div>
    </section>

    <app-display-component *ngIf="showModal()" (closeModal)="closeModal()"></app-display-component>
    <app-footer></app-footer>

  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #0a0e27 0%, #1a2d5a 100%);
      color: white;
      padding: 6rem 2rem;
      text-align: center;
    }

    .hero-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .hero h1 {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero p {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-button {
      display: inline-block;
      background: #0066FF;
      color: white;
      padding: 1rem 2.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
    }

    .hero-button:hover {
      background: #00D4FF;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,102,255,0.3);
    }

    .section {
      padding: 4rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
      color: #0a0e27;
    }

    .markets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .market-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
      transition: all 0.3s;
      cursor: pointer;
      border: 2px solid transparent;
    }

    .market-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
      border-color: #0066FF;
    }

    .market-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .market-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #0a0e27;
    }

    .market-card p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .market-button {
      background: linear-gradient(135deg, #0066FF, #00D4FF);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }

    .market-button:hover {
      transform: scale(1.05);
    }

    .benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .testimonial {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border-left: 4px solid #0066FF;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }

    .testimonial-text {
      margin-bottom: 1.5rem;
      color: #333;
      font-style: italic;
    }

    .testimonial-author {
      font-weight: bold;
      color: #0a0e27;
    }

    .testimonial-role {
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .section { padding: 2rem 1rem; }
    }
    
    `],
})
export class Landing {
  showModal = signal(false);
  /// testimonials = signal<{ text: string; author: string; role: string; market: string; }[]>([]);
  testimonials: any; /// = this.testimonialsService.getAll();
  markets = [
    { icon: '🎓', title: 'Schools & Education', description: 'Engage students with curriculum-aligned, curated content delivered seamlessly across campus.', key: 'schools' },
    { icon: '❤️', title: 'Senior Living', description: 'Accessible content designed for active seniors. Easy interface, relevant programming.', key: 'senior_living' },
    { icon: '🏨', title: 'Hotels & Hospitality', description: 'Guest-ready entertainment, local guides, and integrated room controls.', key: 'hotels' }
  ]

  constructor(
    private testimonialsService: TestimonialsService
  ) {
    this.testimonials = this.testimonialsService.getAll();
    console.log('Testimonials:', this.testimonials);
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  } 
}
