import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../core-comps/navbar';
import { Footer } from '../core-comps/footer';
import { DisplayComponent } from '../core-comps/display-component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, NavbarComponent, Footer, DisplayComponent],
  template: `
    <app-navbar></app-navbar>

    <section class="section">
      <h2 class="section-title">Flexible Pricing for Every Size</h2>
      <p class="intro-text">
        Start with what you need. Scale as you grow. Custom solutions available.
      </p>

      <div class="pricing-grid">
        <div class="pricing-card" [class.featured]="plan.featured" *ngFor="let plan of pricingPlans">
          <h3>{{ plan.name }}</h3>
          <div class="price">
            <span class="amount">{{ plan.priceText || ('$' + plan.price) }}</span>
            <span class="period" *ngIf="plan.price">/month</span>
          </div>
          <p class="description">{{ plan.description }}</p>
          
          <ul class="features">
            <li *ngFor="let feature of plan.features">{{ feature }}</li>
          </ul>

          <button class="pricing-button">
            {{ plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started' }}
          </button>
        </div>
      </div>

      <div class="faq-section">
        <h3>Questions About Pricing?</h3>
        <p>Every organization is unique. We'll work with you to find the perfect plan.</p>
        <button class="faq-button" (click)="openModal()">Schedule a Demo</button>
      </div>
    </section>

    <section class="comparison-section">
      <h2 class="section-title">What's Included in Every Plan</h2>
      <div class="comparison-grid">
        <div class="comparison-item">
          <div class="comparison-icon">🚀</div>
          <h4>Lightning-Fast Deployment</h4>
          <p>Get up and running in hours, not weeks. Zero infrastructure complexity.</p>
        </div>
        <div class="comparison-item">
          <div class="comparison-icon">📊</div>
          <h4>Real-Time Analytics</h4>
          <p>Track engagement, monitor usage, understand your audience better.</p>
        </div>
        <div class="comparison-item">
          <div class="comparison-icon">🔒</div>
          <h4>Enterprise Security</h4>
          <p>Your data is protected with industry-leading encryption and compliance.</p>
        </div>
        <div class="comparison-item">
          <div class="comparison-icon">🎯</div>
          <h4>Content Curation</h4>
          <p>AI-powered recommendations tailored to your specific market and audience.</p>
        </div>
      </div>
    </section>

    <section class="trial-section">
      <h2>Start Free Today</h2>
      <p>All plans include a 30-day free trial. No credit card required.</p>
      <button class="trial-button" (click)="openModal()">Start Your Free Trial</button>
    </section>

    <app-display-component *ngIf="showModal()" (closeModal)="closeModal()"></app-display-component>

    <app-footer></app-footer>
    `,
  styles: [`
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

      .intro-text {
        text-align: center;
        margin-bottom: 3rem;
        color: #666;
        font-size: 1.1rem;
      }

      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
      }

      .pricing-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        border: 2px solid #eee;
        text-align: center;
        transition: all 0.3s;
        position: relative;
      }

      .pricing-card.featured {
        border-color: #0066FF;
        box-shadow: 0 10px 30px rgba(0,102,255,0.2);
        transform: scale(1.05);
      }

      .pricing-card:hover {
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      }

      .pricing-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #0a0e27;
      }

      .price {
        margin: 1.5rem 0;
      }

      .amount {
        font-size: 2.5rem;
        font-weight: bold;
        color: #0066FF;
      }

      .period {
        color: #666;
        font-size: 1rem;
      }

      .description {
        color: #666;
        margin-bottom: 1.5rem;
      }

      .features {
        list-style: none;
        text-align: left;
        margin: 2rem 0;
        color: #666;
      }

      .features li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 1.5rem;
      }

      .features li:before {
        content: "✓";
        color: #0066FF;
        font-weight: bold;
        position: absolute;
        left: 0;
      }

      .pricing-button {
        background: #0066FF;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
        margin-top: 1.5rem;
        transition: all 0.3s;
      }

      .pricing-button:hover {
        background: #00D4FF;
      }

      .faq-section {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        margin-top: 3rem;
      }

      .faq-section h3 {
        color: #0a0e27;
        margin-bottom: 1rem;
      }

      .faq-section p {
        color: #666;
        margin-bottom: 1.5rem;
      }

      .faq-button {
        background: #0066FF;
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
      }

      .faq-button:hover {
        background: #00D4FF;
      }

      .comparison-section {
        background: white;
        padding: 4rem 2rem;
        margin-top: 3rem;
      }

      .comparison-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }

      .comparison-item {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        transition: all 0.3s;
      }

      .comparison-item:hover {
        background: white;
        box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        transform: translateY(-5px);
      }

      .comparison-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .comparison-item h4 {
        color: #0a0e27;
        margin-bottom: 0.5rem;
      }

      .comparison-item p {
        color: #666;
        font-size: 0.9rem;
      }

      .trial-section {
        background: linear-gradient(135deg, #0a0e27 0%, #1a2d5a 100%);
        color: white;
        padding: 4rem 2rem;
        text-align: center;
        margin-top: 3rem;
      }

      .trial-section h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .trial-section p {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .trial-button {
        background: #0066FF;
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.1rem;
        transition: all 0.3s;
      }

      .trial-button:hover {
        background: #00D4FF;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0,102,255,0.3);
      }

      @media (max-width: 768px) {
        .pricing-card.featured { transform: scale(1); }
        .section { padding: 2rem 1rem; }
      }
    `]
})
export class Services {
  showModal = signal(false);

  pricingPlans = [
    {
      name: 'Starter',
      price: 399,
      description: 'Perfect for smaller organizations',
      features: [
        'Up to 5 locations',
        'Basic content curation',
        '24/7 support',
        'Monthly updates'
      ],
      featured: false
    },
    {
      name: 'Professional',
      price: 899,
      description: 'Most popular choice',
      features: [
        'Up to 25 locations',
        'Advanced AI curation',
        'Priority support',
        'Weekly updates',
        'Custom branding',
        'Analytics dashboard'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: null,
      priceText: 'Custom',
      description: 'For large-scale deployments',
      features: [
        'Unlimited locations',
        'Full API access',
        'Dedicated account manager',
        'Real-time support',
        'Custom integrations',
        'SLA guarantees'
      ],
      featured: false
    }
  ];

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}

