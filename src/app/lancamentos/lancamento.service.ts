import { Injectable } from '@angular/core';

import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentoUrl}?resumo`, {headers})
      .toPromise()
      .then(response =>
        response.json().content
      );
  }
}
