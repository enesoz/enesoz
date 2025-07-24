import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

/**
 * Pipe for translating text in templates
 * Usage: {{ 'key.to.translate' | translate }}
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  /**
   * Transforms a translation key into translated text
   * @param key The translation key to transform
   * @returns The translated text
   */
  transform(key: string): string {
    return this.translateService.translate(key);
  }
}
