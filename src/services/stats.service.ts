import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export interface StatResponse {
    count: number;
}

@Injectable({
    providedIn: 'root'
})
export class StatsService {
    private readonly BASE_URL = 'https://api.counterapi.dev/v1/enesoz-cv';

    // Cache observables to prevent multiple increments on same page load if called multiple times incorrectly
    private viewIncrement$: Observable<number> | null = null;

    constructor(private http: HttpClient) { }

    /**
     * Increments the view counter and returns the new count.
     * Should be called once per session/load.
     */
    incrementViews(): Observable<number> {
        if (!this.viewIncrement$) {
            this.viewIncrement$ = this.http.get<StatResponse>(`${this.BASE_URL}/views/up`).pipe(
                map(res => res.count),
                catchError(this.handleError),
                shareReplay(1)
            );
        }
        return this.viewIncrement$;
    }

    /**
     * Increments the download counter and returns the new count.
     */
    incrementDownloads(): Observable<number> {
        return this.http.get<StatResponse>(`${this.BASE_URL}/downloads/up`).pipe(
            map(res => res.count),
            catchError(this.handleError)
        );
    }

    /**
     * Gets the current view count without incrementing.
     */
    getViews(): Observable<number> {
        return this.http.get<StatResponse>(`${this.BASE_URL}/views/`).pipe(
            map(res => res.count),
            catchError(this.handleError)
        );
    }

    /**
     * Gets the current download count without incrementing.
     */
    getDownloads(): Observable<number> {
        return this.http.get<StatResponse>(`${this.BASE_URL}/downloads/`).pipe(
            map(res => res.count),
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<number> {
        console.warn('Stats API error:', error);
        return of(0);
    }
}
