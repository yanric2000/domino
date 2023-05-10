import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IPedra } from '../../domino.interface';

@Component({
  selector: 'app-pedra',
  templateUrl: './pedra.component.html',
  styleUrls: ['./pedra.component.scss'],
})
export class PedraComponent implements OnInit {
  @Input() pedra!: IPedra;
  @Input() escondida = false;
  @Input() clicavel = false;

  @Output() jogar = new EventEmitter<IPedra>();

  public conteudoParaMostrar: string = '?';
  public pedraNaVertical = false;
  public primeiroValor: number = 0;
  public segundoValor: number = 0;

  ngOnInit(): void {
    this.pedraNaVertical = this.pedra.valor1 === this.pedra.valor2;
    this.atribuirValoresPedra();
  }

  public jogarPedra(): void {
    if (!this.clicavel) {
      return;
    }

    this.jogar.emit(this.pedra);
  }

  private atribuirValoresPedra(): void {
    if (this.pedra.invertido) {
      this.primeiroValor = this.pedra.valor2;
      this.segundoValor = this.pedra.valor1;
    } else {
      this.primeiroValor = this.pedra.valor1;
      this.segundoValor = this.pedra.valor2;
    }
  }
}
