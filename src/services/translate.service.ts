import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

/**
 * Service for handling translations in the application
 */
@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: Record<string, Record<string, any>> = {};
  private currentLang = 'tr'; // Default language
  private translationsLoaded: { [key: string]: Observable<boolean> } = {};

  constructor(private http: HttpClient) {}

  /**
   * Sets the current language and loads translations
   * @param lang Language code
   * @returns Observable that completes when translations are loaded
   */
  public setLanguage(lang: string): Observable<boolean> {
    this.currentLang = lang;
    return this.loadTranslations(lang);
  }

  /**
   * Gets the current language
   * @returns Current language code
   */
  public getCurrentLang(): string {
    return this.currentLang;
  }

  /**
   * Loads translations for a specific language
   * @param lang Language code
   * @returns Observable that completes when translations are loaded
   */
  public loadTranslations(lang: string): Observable<boolean> {
    if (this.translationsLoaded[lang]) {
      return this.translationsLoaded[lang];
    }

    this.translationsLoaded[lang] = this.http.get(`/assets/i18n/${lang}.json`)
      .pipe(
        map(response => {
          this.translations[lang] = response as Record<string, any>;
          return true;
        }),
        catchError((err) => {
          console.error(`Could not load translations for language ${lang} due to reason ${err.message}`);
          return of(false);
        }),
        shareReplay(1)
      );

    return this.translationsLoaded[lang];
  }

  /**
   * Translates a key to the current language
   * @param key Translation key (can be nested with dot notation)
   * @returns Translated text or the key if translation is not found
   */
  public translate(key: string): string {
    if (!this.translations[this.currentLang]) {
      return key; // Translations not loaded, return the key
    }

    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Translation not found, return the key
      }
    }
    return typeof value === 'string' ? value : JSON.stringify(value);
  }
}
