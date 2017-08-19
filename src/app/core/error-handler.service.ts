import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao passar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.toasty.error(msg);
  }

}
