import { Document } from 'mongoose';
import { DesafioStatus } from '../enums';
import { Jogador } from 'src/jogadores/interfaces';

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Jogador[];
  partida: Partida;
}

export interface Partida extends Document {
  categoria: string;
  jogadores: Jogador[];
  def: Jogador;
  resultado: Resultado[];
}

export interface Resultado {
  set: string;
}
