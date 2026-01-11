import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP Error Interceptor - Centralized error handling for all HTTP requests
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Client Error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMessage = `Server Error (${error.status}): ${error.message}`;

                // Log specific error cases
                switch (error.status) {
                    case 404:
                        console.error('Resource not found:', error.url);
                        break;
                    case 500:
                        console.error('Internal server error:', error.message);
                        break;
                    case 0:
                        console.error('Network error - unable to connect to server');
                        break;
                    default:
                        console.error('HTTP Error:', errorMessage);
                }
            }

            // Return error observable
            return throwError(() => new Error(errorMessage));
        })
    );
};
