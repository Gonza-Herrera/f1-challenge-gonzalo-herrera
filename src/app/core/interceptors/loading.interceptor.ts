import { 
  HttpInterceptorFn, 
  HttpRequest, 
  HttpHandlerFn, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export const loadingInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);
  const alertService = inject(AlertService);

  loadingService.show();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      alertService.showErrorAlert();
      return throwError(() => error);
    }),
    finalize(() => loadingService.hide())
  );
};
