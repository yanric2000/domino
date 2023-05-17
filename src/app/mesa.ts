import { IPedra } from './domino.interface';

export class Mesa {
  public pedras: IPedra[] = [];

  public obterInicio(): IPedra | null {
    return this.pedras[0];
  }

  public obterFim(): IPedra | null {
    return this.pedras[this.pedras.length - 1];
  }

  public inserirInicio(pedra: IPedra): void {
    const pedraInicio = this.obterInicio() as IPedra;

    if (this.pedras.length === 0) {
      this.pedras.push(pedra);

      return;
    }

    const valor1 = pedra.valor1;

    const valorDisponivel = pedraInicio.invertido
      ? pedraInicio.valor2
      : pedraInicio.valor1;

    if (valorDisponivel === valor1) {
      pedra.invertido = true;
    }

    this.pedras.unshift(pedra);
  }

  public inserirFim(pedra: IPedra): void {
    const pedraFim = this.obterFim();

    if (this.pedras.length === 0 || !pedraFim) {
      this.pedras.push(pedra);

      return;
    }

    const valor2 = pedra.valor2;
    const valorDisponivel = pedraFim.invertido
      ? pedraFim.valor1
      : pedraFim.valor2;

    if (valorDisponivel === valor2) {
      pedra.invertido = true;
    }

    this.pedras.push(pedra);
  }

  public obterTotalPedrasMesa(): number {
    return this.pedras.length;
  }

  public obterPeloIndice(indice: number): IPedra {
    return this.pedras[indice];
  }

  public obterQuantidadeDeNumerosJogados(numero: number): number {
    return this.pedras.filter(
      (pedra) => pedra.valor1 === numero || pedra.valor2 === numero
    ).length;
  }

  public obterValorInicioDisponivel(): number {
    const pedraInicio = this.obterInicio() as IPedra;

    return pedraInicio.invertido ? pedraInicio.valor2 : pedraInicio.valor1;
  }

  public obterValorFimDisponivel(): number {
    const pedraFim = this.obterFim() as IPedra;
    return pedraFim.invertido ? pedraFim.valor1 : pedraFim.valor2;
  }
}
