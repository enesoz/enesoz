import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

/**
 * Translation value type - can be nested
 */
interface TranslationValue {
  [key: string]: string | TranslationValue;
}

/**
 * Service for handling translations in the application
 */
@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: Record<string, TranslationValue> = {};
  private currentLang = 'tr'; // Default language
  private translationsLoaded: { [key: string]: Observable<boolean> } = {};

  // Observable to notify components when language changes
  private languageChange$ = new BehaviorSubject<string>(this.currentLang);
  public readonly onLanguageChange$ = this.languageChange$.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Sets the current language and loads translations
   * @param lang Language code
   * @returns Observable that completes when translations are loaded
   */
  public setLanguage(lang: string): Observable<boolean> {
    console.log(`🌍 setLanguage called with lang: ${lang}, previous currentLang: ${this.currentLang}`);
    this.currentLang = lang;
    this.languageChange$.next(lang); // Notify subscribers of language change
    console.log(`🌍 currentLang updated to: ${this.currentLang}`);
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
    // Check if already loaded in memory
    if (this.translations[lang]) {
      return of(true);
    }

    // Check if loading is in progress
    if (this.translationsLoaded[lang]) {
      return this.translationsLoaded[lang];
    }

    this.translationsLoaded[lang] = this.http.get<TranslationValue>(`/assets/i18n/${lang}.json`)
      .pipe(
        map(response => {
          this.translations[lang] = response;
          return true;
        }),
        catchError((err: Error) => {
          console.error(`Could not load translations for language ${lang} due to reason: ${err.message}`);
          // Clear failed cache entry so it can be retried
          delete this.translationsLoaded[lang];
          return throwError(() => new Error(`Translation load failed for ${lang}`));
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
    console.log(`🔤 Translating key: ${key}, currentLang: ${this.currentLang}`);

    if (!this.translations[this.currentLang]) {
      console.warn(`⚠️ Translations not loaded for ${this.currentLang}`);
      return key; // Translations not loaded, return the key
    }

    const keys = key.split('.');
    let value: string | TranslationValue = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`⚠️ Translation not found for key: ${key}`);
        return key; // Translation not found, return the key
      }
    }

    const result = typeof value === 'string' ? value : JSON.stringify(value);
    console.log(`✅ Translation result for ${key}: ${result}`);
    return result;
  }
}
