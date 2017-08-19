import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component } from '@angular/core';

import {LazyLoadEvent} from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  filtro: PessoaFiltro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService){ }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
          this.pessoas = resultado.pessoas;
          this.totalRegistros = resultado.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
