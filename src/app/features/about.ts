import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../core-comps/navbar';
import { Footer } from '../core-comps/footer';
import { DisplayComponent } from '../core-comps/display-component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent, Footer, DisplayComponent],
  template: `
    <app-navbar></app-navbar>

    <section class="section">
      <h2 class="section-title">Interactive Platform Demo</h2>
      <p class="intro-text">
        Explore how Adqwest-ME works for your market. Choose one to see the admin dashboard in action.
      </p>

      <div class="markets">
        <div class="market-card" *ngFor="let market of markets" (click)="loadDemo(market.key)">
          <div class="market-icon">{{ market.icon }}</div>
          <h3>{{ market.title }}</h3>
          <button class="market-button">Load Demo</button>
        </div>
      </div>

      <div id="demoContent" class="demo-content" *ngIf="selectedMarket()">
        <div class="dashboard-header">
          <h2>Admin Dashboard - <span class="market-title">{{ getMarketTitle() }}</span></h2>
          <p>This is what your management interface looks like. Full control, simple to use.</p>
        </div>

        <div class="dashboard-content">
          <h3>Content Library</h3>
          <div class="demo-grid">
            <div class="demo-item" *ngFor="let item of demoContent()">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>Ready for a Full Demo?</h2>
      <p>Schedule a meeting with our team to see Adqwest-ME in action on your specific use case.</p>
      <button class="cta-button" (click)="openModal()">Schedule Demo</button>
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
      margin-bottom: 2rem;
      color: #666;
      font-size: 1.1rem;
    }

    .markets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
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
      margin-bottom: 1.5rem;
      color: #0a0e27;
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

    .demo-content {
      margin-top: 3rem;
      animation: slideIn 0.3s ease-in;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dashboard-header {
      background: linear-gradient(135deg, #0066FF, #00D4FF);
      color: white;
      padding: 2rem;
      margin-bottom: 2rem;
      border-radius: 12px;
    }

    .dashboard-header h2 {
      margin-bottom: 1rem;
    }

    .dashboard-header p {
      opacity: 0.9;
    }

    .dashboard-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    }

    .dashboard-content h3 {
      margin-bottom: 1.5rem;
      color: #0a0e27;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .demo-item {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #ddd;
      transition: all 0.3s;
    }

    .demo-item:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }

    .demo-item h4 {
      color: #0066FF;
      margin-bottom: 0.5rem;
    }

    .demo-item p {
      color: #666;
      font-size: 0.9rem;
    }

    .cta-section {
      background: linear-gradient(135deg, #0a0e27 0%, #1a2d5a 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
      margin-top: 3rem;
    }

    .cta-section h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .cta-button {
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

    .cta-button:hover {
      background: #00D4FF;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0,102,255,0.3);
    }

    @media (max-width: 768px) {
      .section { padding: 2rem 1rem; }
      .section-title { font-size: 1.8rem; }
    }
    `]
})
export class About {
  showModal = signal(false);
  selectedMarket = signal<string | null>(null);
  demoContent = signal<any[]>([]);

  markets = [
    { icon: '🎓', title: 'Schools', key: 'schools' },
    { icon: '❤️', title: 'Senior Living', key: 'senior_living' },
    { icon: '🏨', title: 'Hotels', key: 'hotels' }
  ];

  constructor(private dataService: DataService) {}

  loadDemo(marketKey: string) {
    this.selectedMarket.set(marketKey);
    const content = this.dataService.getContentByMarket(marketKey);
    this.demoContent.set(content);
    
    // Scroll to demo content
    setTimeout(() => {
      const element = document.getElementById('demoContent');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  getMarketTitle(): string {
    const market = this.markets.find(m => m.key === this.selectedMarket());
    switch(this.selectedMarket()) {
      case 'schools':
        return 'School Admin Dashboard';
      case 'senior_living':
        return 'Senior Living Dashboard';
      case 'hotels':
        return 'Hotel Admin Dashboard';
      default:
        return 'Admin Dashboard';
    }
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
