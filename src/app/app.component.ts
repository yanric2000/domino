import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { IPedra } from './domino.interface';
import { IJogador } from './jogador.interface';
import { pedrasFactory } from './pedras';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pedrasParaCompra: IPedra[] = [];

  public jogador: IJogador = {
    pedras: [],
    pontuacao: 0,
  };

  public computador: IJogador = {
    pedras: [],
    pontuacao: 0,
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.novoJogo();
  }

  public novoJogo(): void {
    this.pedrasParaCompra = pedrasFactory();
    this.jogador.pontuacao = 0;
    this.computador.pontuacao = 0;

    this.distribuirPecasJogador();
    this.distribuirPecasComputador();
  }

  public teste(): void {
    console.log('');
  }

  private distribuirPecasJogador(): void {
    this.jogador.pedras = [];

    for (let i = 0; i < 7; i++) {
      const pedraAleatoria = this.pedrasParaCompra.splice(
        this.obterNumeroAleatorio(0, this.pedrasParaCompra.length - 1),
        1
      );

      this.jogador.pedras.push(pedraAleatoria[0]);
    }
  }

  private distribuirPecasComputador(): void {
    this.computador.pedras = [];

    for (let i = 0; i < 7; i++) {
      const pedraAleatoria = this.pedrasParaCompra.splice(
        this.obterNumeroAleatorio(0, this.pedrasParaCompra.length - 1),
        1
      );

      this.computador.pedras.push(pedraAleatoria[0]);
    }
  }

  private obterNumeroAleatorio(minimo: number, maximo: number): number {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  }
}
