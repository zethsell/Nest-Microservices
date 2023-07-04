import { IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces';
import { Resultado } from '../interfaces';

export class AtribuirDesafioPartidaDto {
  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  resultado: Array<Resultado>;
}
