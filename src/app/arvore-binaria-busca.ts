import { NoDeque } from './deck';

class ArvoreBinariaBusca<T> {
  private raiz: NoDeque<T> | null;

  constructor() {
    this.raiz = null;
  }

  public inserir(valor: T): void {
    const novoNo = new NoDeque(valor);

    if (!this.raiz) {
      this.raiz = novoNo;
      return;
    }

    let atual = this.raiz;

    while (true) {
      if (valor === atual.dados) {
        return;
      }
      if (valor < atual.dados) {
        if (!atual.anterior) {
          atual.anterior = novoNo;
          return;
        }
        atual = atual.anterior;
      } else {
        if (!atual.proximo) {
          atual.proximo = novoNo;
          return;
        }
        atual = atual.proximo;
      }
    }
  }

  public converterArvoreParaLista(): T[] {
    const lista: T[] = [];

    const percorrerNo = (no: NoDeque<T> | null) => {
      if (no !== null) {
        percorrerNo(no.anterior);
        lista.push(no.dados);
        percorrerNo(no.proximo);
      }
    };

    percorrerNo(this.raiz);

    return lista;
  }
}
