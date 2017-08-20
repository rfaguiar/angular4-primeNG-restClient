import { AuthHttp } from 'angular2-jwt';
import { Pessoa } from './../core/model';
import { Injectable } from '@angular/core';

import {URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoaUrl= 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    return this.http.get(`${this.pessoaUrl}?resumo`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = response.json().content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoaUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoaUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Pessoa);
  }
}
