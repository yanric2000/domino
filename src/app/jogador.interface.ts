import { IPedra } from './domino.interface';

export interface IJogador {
  nome: string;
  pedras: IPedra[];
  pontuacao: number;
}
