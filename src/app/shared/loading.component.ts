import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, NzSpinModule, AsyncPipe],
  template: `
    <nz-spin *ngIf="loadingService.loading$ | async" nzTip="Cargando..."></nz-spin>
  `
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
