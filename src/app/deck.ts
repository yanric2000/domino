// export class Deque<T> {
//   private elementos: T[];

//   constructor() {
//     this.elementos = [];
//   }

//   public estaVazio(): boolean {
//     return this.elementos.length === 0;
//   }

//   public inserirInicio(element: T): void {
//     this.elementos.unshift(element);
//   }

//   public inserirFinal(element: T): void {
//     this.elementos.push(element);
//   }

//   public removerInicio(): T | undefined {
//     return this.elementos.shift();
//   }

//   public removerFinal(): T | undefined {
//     return this.elementos.pop();
//   }

//   public obterPrimeiro(): T | null {
//     return this.elementos[0];
//   }

//   public obterUltimo(): T | undefined {
//     return this.elementos[this.elementos.length - 1];
//   }

//   public obterTamanho(): number {
//     return this.elementos.length;
//   }

//   public converterParaLista(): T[] {
//     return this.elementos;
//   }
// }

// class DequeNode<T> {
//   data: T;
//   previous: DequeNode<T> | null;
//   next: DequeNode<T> | null;

//   constructor(data: T, previous: DequeNode<T> | null = null, next: DequeNode<T> | null = null) {
//     this.data = data;
//     this.previous = previous;
//     this.next = next;
//   }
// }
class NoDeque<T> {
  dados: T;
  anterior: NoDeque<T> | null;
  proximo: NoDeque<T> | null;

  constructor(
    data: T,
    previous: NoDeque<T> | null = null,
    next: NoDeque<T> | null = null
  ) {
    this.dados = data;
    this.anterior = previous;
    this.proximo = next;
  }
}

class Deque<T> {
  private cabeca: NoDeque<T> | null = null;
  private cauda: NoDeque<T> | null = null;
  private tamanho = 0;

  inserirInicio(item: T) {
    const no = new NoDeque(item, null, this.cabeca);
    if (this.cabeca) {
      this.cabeca.anterior = no;
    } else {
      this.cauda = no;
    }
    this.cabeca = no;
    this.tamanho++;
  }

  inserirFim(item: T) {
    const node = new NoDeque(item, this.cauda, null);
    if (this.cauda) {
      this.cauda.proximo = node;
    } else {
      this.cabeca = node;
    }
    this.cauda = node;
    this.tamanho++;
  }

  removerInicio(): T | undefined {
    if (!this.cabeca) return undefined;
    const node = this.cabeca;
    if (this.cabeca === this.cauda) {
      this.cabeca = null;
      this.cauda = null;
    } else {
      this.cabeca = node.proximo;
      (this.cabeca as NoDeque<T>).anterior = null;
    }
    this.tamanho--;
    return node.dados;
  }

  removerFim(): T | undefined {
    if (!this.cauda) return undefined;
    const node = this.cauda;
    if (this.cabeca === this.cauda) {
      this.cabeca = null;
      this.cauda = null;
    } else {
      this.cauda = node.anterior;
      (this.cauda as NoDeque<T>).proximo = null;
    }
    this.tamanho--;
    return node.dados;
  }

  obterInicio() {
    return this.cabeca;
  }

  obterFim() {
    return this.cauda;
  }

  estaVazio(): boolean {
    return this.tamanho === 0;
  }

  obterTamanho(): number {
    return this.tamanho;
  }
}
