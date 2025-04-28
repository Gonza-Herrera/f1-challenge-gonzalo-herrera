import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { loadingInterceptorFn } from './app/core/interceptors/loading.interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    // Importa globalmente HttpClientModule y NzModalModule
    importProvidersFrom(HttpClientModule, NzModalModule),
    provideHttpClient(withInterceptors([loadingInterceptorFn])),
    provideRouter(routes),
    provideAnimations()
  ]
}).catch(err => console.error(err));
