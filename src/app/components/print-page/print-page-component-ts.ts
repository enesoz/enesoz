import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslatePipe} from '../../../services/translate_pipe';
import {TranslateService} from '../../../services/translate_service';

@Component({
  selector: 'app-print-page',
  standalone: true,
  template: `
    <div class="print-actions">
      <button (click)="printCV()" class="print-button">
        <span class="icon">🖨️</span> {{ 'print.printCV' | translate }}
      </button>
      <button (click)="downloadPDF()" class="download-button">
        <span class="icon">📥</span> {{ 'print.downloadPDF' | translate }}
      </button>
    </div>

  `,
  imports: [
    TranslatePipe
  ],
  styles: [`
    .print-actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: var(--spacing-lg);
      gap: var(--spacing-sm);
    }

    .print-button, .download-button {
      padding: 8px 16px;
      background-color: var(--primary-color);
      color: var(--background-color);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .download-button {
      background-color: #2ecc71;
    }

    .print-button:hover {
      background-color: var(--hover-color);
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
  constructor(private titleService: Title, private translateService: TranslateService
  ) {}

  printCV() {
    this.titleService.setTitle('Enes Özdemir - CV');
    window.print();
  }

  downloadPDF() {
    // Bu işlev normalde bir PDF dönüştürme servisi gerektirir
    // Basitçe yazdırma diyaloğuna yönlendirelim
    alert(this.translateService.translate('print.downloadAlert'));
    this.printCV();
  }
}
