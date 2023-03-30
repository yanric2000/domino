export class Deque<T> {
  private elementos: T[];

  constructor() {
    this.elementos = [];
  }

  public estaVazio(): boolean {
    return this.elementos.length === 0;
  }

  public inserirInicio(element: T): void {
    this.elementos.unshift(element);
  }

  public inserirFinal(element: T): void {
    this.elementos.push(element);
  }

  public removerInicio(): T | undefined {
    return this.elementos.shift();
  }

  public removerFinal(): T | undefined {
    return this.elementos.pop();
  }

  public obterPrimeiro(): T | undefined {
    return this.elementos[0];
  }

  public obterUltimo(): T | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  public obterTamanho(): number {
    return this.elementos.length;
  }
}
