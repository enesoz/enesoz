import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-print-page',
  template: `
    <div class="print-actions">
      <button (click)="printCV()" class="print-button">
        <span class="icon">🖨️</span> CV'yi Yazdır
      </button>
      <button (click)="downloadPDF()" class="download-button">
        <span class="icon">📥</span> PDF İndir
      </button>
    </div>
  `,
  styles: [`
    .print-actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
      gap: 10px;
    }
    
    .print-button, .download-button {
      padding: 8px 16px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .download-button {
      background-color: #2ecc71;
    }
    
    .print-button:hover {
      background-color: #2980b9;
    }
    
    .download-button:hover {
      background-color: #27ae60;
    }
    
    .icon {
      font-size: 16px;
    }
    
    @media print {
      .print-actions {
        display: none;
      }
    }
  `]
})
export class PrintPageComponent {
  constructor(private titleService: Title) {}
  
  printCV() {
    this.titleService.setTitle('Enes Özdemir - CV');
    window.print();
  }
  
  downloadPDF() {
    // Bu işlev normalde bir PDF dönüştürme servisi gerektirir
    // Basitçe yazdırma diyaloğuna yönlendirelim
    alert('PDF indirme işlevi entegre edilecek. Şimdilik Yazdır diyaloğu açılacak, PDF olarak kaydedin.');
    this.printCV();
  }
}