import { AuthService } from './../../seguranca/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor( private auth: AuthService) { }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
}
