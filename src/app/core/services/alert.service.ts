import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private modal: NzModalService) {}

  showErrorAlert(message: string = 'Error al cargar los datos...'): void {
    this.modal.error({
      nzTitle: 'Error',
      nzContent: message,
      nzClosable: true,
      nzMaskClosable: true,
      nzOkText: 'Ok'
    });
  }
}
