import { Component, OnInit } from '@angular/core';

import { IPedra } from './domino.interface';
import { IJogador } from './jogador.interface';
import { Mesa } from './mesa';
import { pedrasFactory } from './pedras';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pedrasParaCompra: IPedra[] = [];
  public pedrasMesa = new Mesa();

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

  public jogarPedra(pedraJogada: IPedra, jogador: IJogador): void {
    if (this.pedrasMesa.obterTotalPedrasMesa() === 0) {
      this.jogarPedraInicio(pedraJogada, jogador);
      // Caso o jogador tenha feito o lance é a vez do computador
      if (jogador !== this.computador) {
        this.jogarPedraDoComputador();
      }
      return;
    }

    const cartaFoiJogada = this.jogarPedraDeAcordoComPossibilidade(
      pedraJogada,
      jogador
    );

    // Caso o jogador tenha feito o lance é a vez do computador
    if (jogador !== this.computador && cartaFoiJogada) {
      this.jogarPedraDoComputador();
    }
  }

  public comprarPedra(jogador: IJogador, pedraParaComprar: IPedra): IPedra {
    const indiceParaComprar = this.pedrasParaCompra.findIndex(
      (pedra) => pedra === pedraParaComprar
    );
    const pedraComprada = this.pedrasParaCompra.splice(indiceParaComprar, 1)[0];

    jogador.pedras.push(pedraComprada);

    this.verificarJogadorPossuiPedrasParaJogar(jogador);

    return pedraComprada;
  }

  private jogarPedraDeAcordoComPossibilidade(
    pedraJogada: IPedra,
    jogador: IJogador
  ): boolean {
    const pedraPodeSerJogadaNoInicio = this.verificarPedraPodeSerJogada(
      pedraJogada,
      'I'
    );
    const pedraPodeSerJogadaNoFim = this.verificarPedraPodeSerJogada(
      pedraJogada,
      'F'
    );
    let cartaJogadaComSucesso = false;

    // JOGAR NO COMECO OU NO FIM
    if (pedraPodeSerJogadaNoInicio && pedraPodeSerJogadaNoFim) {
      this.jogarPedraEscolhendoLado(pedraJogada, jogador);
      cartaJogadaComSucesso = true;
      // JOGAR NO INÍCIO
    } else if (pedraPodeSerJogadaNoInicio) {
      this.jogarPedraInicio(pedraJogada, jogador);
      cartaJogadaComSucesso = true;
    }
    // JOGAR NO FIM
    else if (pedraPodeSerJogadaNoFim) {
      this.jogarPedraFim(pedraJogada, jogador);
      cartaJogadaComSucesso = true;
    }

    return cartaJogadaComSucesso;
  }

  private verificarPedraPodeSerJogada(
    pedraJogada: IPedra,
    inicioOuFim: 'I' | 'F'
  ): boolean {
    const valoresPedra = [pedraJogada.valor1, pedraJogada.valor2];

    return valoresPedra.includes(this.obterValorPedraDisponivel(inicioOuFim));
  }

  private obterValorPedraDisponivel(inicioOuFim: 'I' | 'F'): number {
    let pedra: IPedra;

    // Pedra no início
    if (inicioOuFim === 'I') {
      pedra = this.pedrasMesa.obterInicio() as IPedra;
      return pedra.invertido ? pedra.valor2 : pedra.valor1;
    }

    // Pedra no fim
    pedra = this.pedrasMesa.obterFim() as IPedra;

    return pedra.invertido ? pedra.valor1 : pedra.valor2;
  }

  private jogarMaiorPedraEntreOsJogadores(): void {
    if (
      this.obterCondicoesJogadorComeca().some((condicao) => condicao === true)
    ) {
      this.jogarMaiorPedra(this.jogador);
    } else {
      this.jogarMaiorPedra(this.computador);
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

  private jogarMaiorPedra(jogador: IJogador): void {
    const indiceMaiorPedra = this.encontrarIndiceMaiorPedraParaJogar(jogador);
    const pedraParaJogar = jogador.pedras[indiceMaiorPedra];

    this.jogarPedra(pedraParaJogar, jogador);
  }

  private encontrarIndiceMaiorPedraParaJogar(jogador: IJogador): number {
    const duplasJogador = this.encontrarDuplasJogadorOrdemDecrescente(jogador);

    if (duplasJogador.length > 0) {
      return this.encontrarIndiceMaiorDuplaJogador(jogador);
    }

    return this.encontrarIndicePedraComMaiorValor(jogador);
  }

  private encontrarIndiceMaiorDuplaJogador(jogador: IJogador): number {
    const duplasJogador = this.encontrarDuplasJogadorOrdemDecrescente(jogador);

    const maiorDupla = duplasJogador[0];

    const indiceMaiorDupla = jogador.pedras.findIndex(
      (pedra) => pedra === maiorDupla
    );
    return indiceMaiorDupla;
  }

  private encontrarIndicePedraComMaiorValor(jogador: IJogador) {
    const pedrasAuxiliar = jogador.pedras.concat([]);
    pedrasAuxiliar.sort(this.ordenarPedrasPelaSomaValores());

    const indicePedraMaiorValor = jogador.pedras.findIndex(
      (pedra) => pedra === pedrasAuxiliar[0]
    );
    return indicePedraMaiorValor;
  }

  private encontrarDuplasJogadorOrdemDecrescente(jogador: IJogador): IPedra[] {
    const duplas = jogador.pedras.filter(
      (pedra) => pedra.valor1 === pedra.valor2
    );
    duplas.sort((pedra1, pedra2) => pedra1.valor1 - pedra2.valor1);
    return duplas;
  }

  private encontrarMaiorValorPedras(pedras: IPedra[]): number {
    let maiorPedra: IPedra = {
      valor1: 0,
      valor2: 0,
      invertido: false,
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
      .sort(this.ordenarPedrasPelaSomaValores());
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

  private jogarPedraEscolhendoLado(pedra: IPedra, jogador: IJogador): void {
    if (jogador === this.computador) {
      this.jogarPedraComputadorNoMelhorLado(pedra);
      return;
    }

    const lado = prompt(
      'Deseja jogar a pedra na "ESQUERDA" ou na "DIREITA"?'
    ) as LadoType;

    if (lado === LadoEnum.ESQUERDA) {
      this.jogarPedraInicio(pedra, jogador);
    } else {
      this.jogarPedraFim(pedra, jogador);
    }
  }

  private jogarPedraInicio(pedraJogada: IPedra, jogador: IJogador): void {
    const indicePedra = jogador.pedras.findIndex(
      (pedra) => pedra === pedraJogada
    );
    jogador.pedras.splice(indicePedra, 1);

    this.pedrasMesa.inserirInicio(pedraJogada);
  }

  private jogarPedraFim(pedraJogada: IPedra, jogador: IJogador): void {
    const indicePedra = jogador.pedras.findIndex(
      (pedra) => pedra === pedraJogada
    );
    jogador.pedras.splice(indicePedra, 1);

    this.pedrasMesa.inserirFim(pedraJogada);
  }

  private ordenarPedrasPelaSomaValores() {
    return (pedra1: IPedra, pedra2: IPedra) =>
      pedra1.valor1 + pedra1.valor2 - (pedra2.valor1 + pedra2.valor2);
  }

  private jogarPedraDoComputador(): void {
    // Verifica se existe uma carta para jogar
    let pedrasParaJogar = this.encontrarPedrasDisponiveisParaJogar(
      this.computador
    );

    // Compra uma carta sendo possível de jogar
    while (pedrasParaJogar.length === 0) {
      const quantidadeCartasParaComprar = this.pedrasParaCompra.length;

      // Não existe nenhuma carta que pode ser jogada
      if (quantidadeCartasParaComprar === 0) {
        this.desistir(this.computador);
        return;
      }

      // Comprar carta
      const indiceComprarPedra = this.obterNumeroAleatorio(
        0,
        quantidadeCartasParaComprar
      );
      this.comprarPedra(
        this.computador,
        this.pedrasMesa.obterPeloIndice(indiceComprarPedra)
      );

      pedrasParaJogar = this.encontrarPedrasDisponiveisParaJogar(
        this.computador
      );
    }

    pedrasParaJogar.sort(
      (pedra1, pedra2) =>
        pedra2.valor1 + pedra2.valor2 - pedra1.valor1 + pedra1.valor2
    );

    this.jogarPedra(pedrasParaJogar[0], this.computador);
  }

  private encontrarPedrasDisponiveisParaJogar(jogador: IJogador): IPedra[] {
    const valoresDisponiveis = [
      this.obterValorPedraDisponivel('I'),
      this.obterValorPedraDisponivel('F'),
    ];

    const pedrasDisponiveis = jogador.pedras.filter(
      (pedra) =>
        valoresDisponiveis.includes(pedra.valor1) ||
        valoresDisponiveis.includes(pedra.valor2)
    );

    return pedrasDisponiveis;
  }

  private desistir(jogador: IJogador): void {
    if (jogador === this.jogador) {
      alert('Você perdeu');
    } else if (jogador === this.computador) {
      alert('Parabéns você ganhou');
    }

    this.novoJogo();
  }

  private jogarPedraComputadorNoMelhorLado(pedra: IPedra): void {
    // Verifica qual dos valores se repetiu mais vezes na mesa para então jogar no lado oposto
    const valorInicio = this.obterValorPedraDisponivel('I');
    const valorFim = this.obterValorPedraDisponivel('F');

    const quantidadePedrasJogadasIguaisInicio =
      this.pedrasMesa.obterQuantidadeDeNumerosJogados(valorInicio);
    const quantidadePedrasJogadasIguaisFim =
      this.pedrasMesa.obterQuantidadeDeNumerosJogados(valorFim);

    console.log(
      'valor inicio -> ',
      valorInicio,
      '. Qtd na mesa: ',
      quantidadePedrasJogadasIguaisInicio
    );
    console.log(
      'valor inicio -> ',
      valorFim,
      '. Qtd na mesa: ',
      quantidadePedrasJogadasIguaisFim
    );

    if (
      quantidadePedrasJogadasIguaisInicio > quantidadePedrasJogadasIguaisFim
    ) {
      this.jogarPedraFim(pedra, this.computador);
    } else {
      this.jogarPedraInicio(pedra, this.computador);
    }
  }

  private verificarJogadorPossuiPedrasParaJogar(jogador: IJogador): void {
    const quantidadePedrasDisponiveisParaJogar =
      this.encontrarPedrasDisponiveisParaJogar(jogador);
    const naoExistemMaisPedrasParaComprar = this.pedrasParaCompra.length === 0;
    const jogadorPossuiPedraParaJogar =
      quantidadePedrasDisponiveisParaJogar.length === 0;

    if (naoExistemMaisPedrasParaComprar && jogadorPossuiPedraParaJogar) {
      this.desistir(jogador);
    }
  }
}

type LadoType = 'ESQUERDA' | 'DIREITA';

enum LadoEnum {
  ESQUERDA = 'ESQUERDA',
  DIREITA = 'DIREITA',
}
