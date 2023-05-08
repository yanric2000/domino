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

  ngOnInit(): void {
    if (!this.escondida) {
      this.conteudoParaMostrar = this.concatenarConteudoCarta();
    }
  }

  public jogarPedra(): void {
    if (!this.clicavel) {
      return;
    }

    this.jogar.emit(this.pedra);
  }

  private concatenarConteudoCarta(): string {
    if (this.pedra.invertido) {
      return `${this.pedra.valor2} | ${this.pedra.valor1}`;
    }
    return `${this.pedra.valor1} | ${this.pedra.valor2}`;
  }
}
