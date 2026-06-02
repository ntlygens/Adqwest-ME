import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-display-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
      <div class="modal active">
        <div class="modal-content">
          <span class="modal-close" (click)="onClose()">&times;</span>
          <h2 style="margin-bottom: 1.5rem; color: #0a0e27;">Schedule Your Demo</h2>
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Your Name *</label>
              <input type="text" id="name" [(ngModel)]="formData.name" name="name" required>
            </div>
            <div class="form-group">
              <label for="company">Organization Name *</label>
              <input type="text" id="company" [(ngModel)]="formData.company" name="company" required>
            </div>
            <div class="form-group">
              <label for="market">Market *</label>
              <select id="market" [(ngModel)]="formData.market" name="market" required>
                <option value="">Select your market</option>
                <option value="schools">Schools & Education</option>
                <option value="senior_living">Senior Living</option>
                <option value="hotels">Hotels & Hospitality</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" [(ngModel)]="formData.email" name="email" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" [(ngModel)]="formData.phone" name="phone">
            </div>
            <div class="form-group">
              <label for="message">Message (Optional)</label>
              <textarea id="message" [(ngModel)]="formData.message" name="message"></textarea>
            </div>
            <button type="submit" class="submit-button">Schedule Demo</button>
          </form>
        </div>
      </div>
      `,
  styles: [`
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
      }

      .modal-close {
        float: right;
        font-size: 2rem;
        cursor: pointer;
        color: #999;
      }

      .modal-close:hover {
        color: #333;
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
      }

      .form-group textarea {
        resize: vertical;
        min-height: 100px;
      }

      .submit-button {
        background: #0066FF;
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

      .submit-button:hover {
        background: #00D4FF;
      }
  `]

})

export class DisplayComponent {
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    company: '',
    market: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private apiService: ApiService) { }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.apiService.submitDemoRequest(this.formData).subscribe({
      next: (response) => {
        alert('Demo request submitted! We will contact you within 24 hours.');
        this.resetForm();
        this.onClose();
      },
      error: (error) => {
        alert('Error: ' + (error.error?.error || 'Failed to submit'));
      }
    });
  }

  resetForm() {
    this.formData = { name: '', company: '', market: '', email: '', phone: '', message: '' };
  }
}