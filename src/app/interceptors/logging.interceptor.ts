import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

/**
 * Logging Interceptor - Logs all HTTP requests and responses
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const started = Date.now();

    return next(req).pipe(
        tap({
            next: () => {
                const elapsed = Date.now() - started;
            },
            error: (error) => {
                const elapsed = Date.now() - started;
                console.error(`❌ HTTP Error: ${req.method} ${req.url} (${elapsed}ms)`, error);
            }
        })
    );
};
