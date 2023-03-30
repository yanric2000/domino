import { Component, OnInit } from '@angular/core';

import { Deque } from './deck';
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
  public pedrasMesa = new Deque<IPedra>();

  public jogador: IJogador = {
    pedras: [],
    pontuacao: 0,
  };

  public computador: IJogador = {
    pedras: [],
    pontuacao: 0,
  };

  ngOnInit(): void {
    this.novoJogo();
  }

  public novoJogo(): void {
    this.pedrasParaCompra = pedrasFactory();
    this.jogador.pontuacao = 0;
    this.computador.pontuacao = 0;

    this.distribuirPedrasJogador();
    this.distribuirPedrasComputador();
    this.jogarMaiorPedraEntreOsJogadores();
  }

  public jogarPedra(pedra: IPedra): void {}

  private jogarMaiorPedraEntreOsJogadores(): void {
    if (
      this.obterCondicoesJogadorComeca().some((condicao) => condicao === true)
    ) {
      this.jogarMaiorPedraJogador();
    } else {
      this.jogarMaiorPedraComputador();
    }
  }

  private obterCondicoesJogadorComeca() {
    const duplasJogador = this.encontrarPedrasDuplasOrdenadas(
      this.jogador.pedras
    );
    const duplasComputador = this.encontrarPedrasDuplasOrdenadas(
      this.computador.pedras
    );
    const duplaJogadorMaiorQueComputador =
      duplasJogador.length > 0 &&
      duplasComputador.length > 0 &&
      duplasJogador[0].valor1 > duplasComputador[0].valor1;
    const jogadorPossuiDuplaEComputadorNao =
      duplasJogador.length > 0 && duplasComputador.length === 0;

    const condicoesJogadorComeca = [
      duplaJogadorMaiorQueComputador,
      jogadorPossuiDuplaEComputadorNao,
      this.encontrarMaiorValorPedras(this.jogador.pedras) >
        this.encontrarMaiorValorPedras(this.computador.pedras),
    ];

    return condicoesJogadorComeca;
  }

  private jogarMaiorPedraJogador(): void {}

  private jogarMaiorPedraComputador(): void {}

  private encontrarMaiorValorPedras(pedras: IPedra[]): number {
    let maiorPedra: IPedra = {
      valor1: 0,
      valor2: 0,
    };
    pedras.forEach((pedra) => {
      if (pedra.valor1 + pedra.valor2 > maiorPedra.valor1 + maiorPedra.valor2) {
        maiorPedra = pedra;
      }
    });

    return maiorPedra.valor1 + maiorPedra.valor2;
  }

  private encontrarPedrasDuplasOrdenadas(pedras: IPedra[]): IPedra[] {
    return pedras
      .filter((pedra) => pedra.valor1 === pedra.valor2)
      .sort(
        (pedra1, pedra2) =>
          pedra1.valor1 + pedra1.valor2 - (pedra2.valor1 + pedra2.valor2)
      );
  }

  private distribuirPedrasJogador(): void {
    this.jogador.pedras = [];

    for (let i = 0; i < 7; i++) {
      const pedraAleatoria = this.pedrasParaCompra.splice(
        this.obterNumeroAleatorio(0, this.pedrasParaCompra.length - 1),
        1
      );

      this.jogador.pedras.push(pedraAleatoria[0]);
    }
  }

  private distribuirPedrasComputador(): void {
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
