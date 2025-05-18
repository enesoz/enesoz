// src/services/translate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translations: any = {};
  private currentLang = 'tr'; // Varsayılan dil
  private translationsLoaded: { [key: string]: Observable<boolean> } = {};

  constructor(private http: HttpClient) {}

  public setLanguage(lang: string): Observable<boolean> {
    this.currentLang = lang;
    return this.loadTranslations(lang);
  }

  public getCurrentLang(): string {
    return this.currentLang;
  }

  public loadTranslations(lang: string): Observable<boolean> {
    if (this.translationsLoaded[lang]) {
      return this.translationsLoaded[lang];
    }

    this.translationsLoaded[lang] = this.http.get(`/assets/i18n/${lang}.json`)
      .pipe(
        map(response => {
          this.translations[lang] = response;
          return true;
        }),
        catchError(() => {
          console.error(`Could not load translations for language ${lang}`);
          return of(false);
        }),
        shareReplay(1)
      );

    return this.translationsLoaded[lang];
  }

  public translate(key: string): string {
    if (!this.translations[this.currentLang]) {
      return key; // Çeviriler yüklenmemiş, anahtarı döndür
    }

    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Çeviri bulunamadı, anahtarı döndür
      }
    }

    return value;
  }
}